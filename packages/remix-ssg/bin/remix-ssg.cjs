#!/usr/bin/env node

const childProcess = require("child_process");
const path = require("path");

childProcess.fork(
  path.resolve(__dirname, "../lib/cli.mjs"),
  process.argv.slice(2),
  {
    execArgv: [
      // "--experimental-loader",
      // path.resolve(__dirname, "../lib/node-override-loader.mjs"),
      "--require",
      path.resolve(__dirname, "../lib/node-override-require.cjs"),
    ],
    stdio: "inherit",
  }
);
