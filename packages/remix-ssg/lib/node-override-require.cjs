const fs = require("fs");
const path = require("path");

const ogExtensions = require.extensions[".js"];
require.extensions[".js"] = (mod, filename) => {
  if (filename.endsWith("dev/dist/compiler/plugins/emptyModulesPlugin.js")) {
    const content = fs.readFileSync(
      path.resolve(__dirname, "empty-modules-plugin-override.cjs"),
      "utf8"
    );

    mod._compile(content, filename);
    return;
  }

  return ogExtensions(mod, filename);
};
