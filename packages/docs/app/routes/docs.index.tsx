import * as React from "react";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
// @ts-expect-error
import HtmlToReact, { Parser as HtmlParser } from "html-to-react";
import { getDocBySlug } from "~/api.server";

export const links = () => [
  {
    rel: "stylesheet",
    href: "https://unpkg.com/highlight.js@11.5.1/styles/a11y-dark.css",
  },
];

export function loader() {
  let { html } = getDocBySlug("_index") || {};

  return json({ html });
}

export function getStaticPaths() {
  return ["/docs"];
}

export default function Test() {
  const { html } = useLoaderData<typeof loader>();

  const body = React.useMemo(() => {
    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(
      React
    );

    const processingInstructions = [
      {
        // This is REQUIRED, it tells the parser
        // that we want to insert our React
        // component as a child
        replaceChildren: false,
        shouldProcessNode: function (node: any) {
          if (
            node.type === "tag" &&
            node.name === "a" &&
            node.attribs.href?.startsWith("/") &&
            !node.attribs.href.startsWith("//")
          ) {
            return true;
          }
          return false;
        },
        processNode: function (node: any, children: any, index: number) {
          return (
            <Link key={index} to={node.attribs.href}>
              {children}
            </Link>
          );
          // return React.createElement("h1", { key: index }, "Heading");
        },
      },
      {
        // Anything else
        shouldProcessNode: function (node: HTMLElement) {
          return true;
        },
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ];

    const parser = new HtmlParser();
    return parser.parseWithInstructions(
      html || "",
      () => true,
      processingInstructions
    );
  }, [html]);

  return <main className="prose lg:prose-xl dark:prose-invert">{body}</main>;
}
