const {
  defineConventionalRoutes,
} = require("@remix-run/dev/dist/config/routesConvention");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  publicPath: process.env.PUBLIC_PATH || "/build/",
  routes(defineRoutes) {
    const routes = defineConventionalRoutes("app");

    if (process.env.BASENAME) {
      for (let routeId in routes) {
        routes[routeId].path = process.env.BASENAME + routes[routeId].path;
      }
    }

    return routes;
  },
};
