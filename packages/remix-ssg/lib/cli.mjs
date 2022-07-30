import * as fs from "fs";
import * as path from "path";
import { cli } from "@remix-run/dev";
import { readConfig } from "@remix-run/dev/dist/config.js";
import { createRequestHandler } from "@remix-run/node";
import * as HTMLParser from "htmlparser2";

process.env.NODE_ENV = "production";

await cli.run(["build"]).then(async () => {
  let publicDir = path.resolve(process.argv.slice(2)[0] || "public");
  const remixConfig = await readConfig();

  /** @type {import("@remix-run/node").ServerBuild} */
  const build = await import(remixConfig.serverBuildPath);
  const remixHandler = createRequestHandler(build, "production");

  const paths = new Set();
  const pathPromises = [];
  for (const [routeId, route] of Object.entries(build.routes)) {
    if (typeof route.module.getStaticPaths === "function") {
      pathPromises.push(
        Promise.resolve(route.module.getStaticPaths()).then((staticPaths) => {
          if (staticPaths && Array.isArray(staticPaths)) {
            for (const path of staticPaths) {
              if (path && typeof path === "string") {
                if (process.env.BASENAME) {
                  paths.add(process.env.BASENAME + path.replace(/^\//, ""));
                } else {
                  paths.add(path);
                }
              }
            }
          }
        })
      );
    }
  }

  await Promise.all(pathPromises);

  if (paths.length === 0) {
    throw new Error("No static paths found");
  }

  console.info("Generating static HTML pages...");
  console.log(paths);
  for (const routePath of paths) {
    const url = new URL(routePath, `http://remix-ssg.com`);
    url.search = "";
    url.hash = "";

    console.info(url.pathname);

    const request = new Request(url.href);
    const response = await remixHandler(request);
    const html = await response.text();
    const document = HTMLParser.parseDocument(html);
    const script = findScriptTag(document);
    if (script) {
      const evalScript = `(() => {${script.replace(
        /^window\.__remixContext = /,
        "return "
      )}})()`;
      const remixContext = eval(evalScript);
      for (const [routeId, routeData] of Object.entries(
        remixContext.routeData
      )) {
        const htmlFile = path.join(publicDir, url.pathname, "index.html");
        fs.mkdirSync(path.dirname(htmlFile), { recursive: true });
        fs.writeFileSync(htmlFile, html, "utf8");

        const dataFile = path.join(
          publicDir,
          url.pathname.replace(/^\//, ""),
          `_${routeId}_data.json`
        );
        fs.mkdirSync(path.dirname(dataFile), { recursive: true });
        fs.writeFileSync(dataFile, JSON.stringify(routeData), "utf8");
      }
    }
  }
});

function findScriptTag(element) {
  if (
    element.tagName === "script" &&
    element.children[0].type === "text" &&
    element.children[0].data.startsWith("window.__remixContext = ")
  ) {
    return element.children[0].data;
  }

  if (element.childNodes) {
    for (const child of element.childNodes) {
      const result = findScriptTag(child);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
}
