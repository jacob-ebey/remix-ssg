let fs = require("fs");
let path = require("path");

let ogExtensions = require.extensions[".js"];
require.extensions[".js"] = (mod, filename) => {
  if (
    filename.endsWith(
      "dev/dist/compiler/plugins/emptyModulesPlugin.js"
    )
  ) {
    let content = fs.readFileSync(
      path.resolve(__dirname, "empty-modules-plugin-override.cjs"),
      "utf8"
    );

    mod._compile(content, filename);
    return;
  }

  return ogExtensions(mod, filename);
};
