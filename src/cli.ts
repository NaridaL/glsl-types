#!/usr/bin/env node
"use strict"

import program = require("commander")
import chokidar = require("chokidar")
import dateFormat = require("dateformat")
import glob = require("glob")
import chalk from "chalk"
import path = require("path")
import fs = require("fs")
import { getTypeScriptDTS, getTypings, Result } from "./main"

program
  .version(
    JSON.parse(
      fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"),
    ).version,
  )
  .usage("[options] <globs ...>")
  .option("-w, --watch", "Watch mode")
  .option(
    "-m, --module [value]",
    'Module from which to import the type. "" to use global type.',
  )
  .option(
    "-t, --type [value]",
    "The type to use. Must accept 4 generic type arguments: in, uniform, out, type",
  )
  .option(
    "-g, --generator [value]",
    "Custom generator to use. Must be a js file with the default export being a function with the following signature:\n" +
      'function(filePath: string, shaderInterface: { in_: NameTypeMap, uniform: NameTypeMap, out: NameTypeMap, type: "vertex" | "fragment" }\n' +
      "type NameTypeMap = { [name: string]: string }",
  )
  .parse(process.argv)

program._name = "glsl-types"
if (program.generator && (program.type || program.module)) {
  throw new Error("--generator is not compatible with --type or --module ")
}

function handleTypes(filePath: string, typings: Result) {
  const newPath = filePath + ".d.ts"
  try {
    const output = getTypeScriptDTS(
      typings,
      program.type,
      "boolean" == typeof program.module ? false : program.module,
    )
    fs.writeFileSync(newPath, output, { encoding: "utf8" })
  } catch (e) {
    console.log(
      "[" + dateFormat("HH:MM:ss") + "]",
      chalk.red("ERROR:"),
      "could not write " + newPath,
      e.message,
    )
    return
  }
  console.log(
    "[" + dateFormat("HH:MM:ss") + "]",
    chalk.green("OK:"),
    filePath + " -> " + newPath,
  )
}
const handler = program.generator
  ? require(program.generator).default
  : handleTypes
function compilePath(filePath: string) {
  const parts = path.parse(filePath)
  let shader
  try {
    shader = fs.readFileSync(filePath, { encoding: "utf8" })
  } catch (e) {
    console.log(
      "[" + dateFormat("HH:MM:ss") + "]",
      chalk.red("ERROR:"),
      "could not read " + filePath,
      e.message,
    )
    return
  }
  let typings
  try {
    typings = getTypings(shader)
  } catch (e) {
    // const e = e2 as SyntaxError
    console.log(
      "[" + dateFormat("HH:MM:ss") + "]",
      chalk.red("ERROR:"),
      filePath + ":" + e.token.line + ":" + e.token.col,
      e.message,
    )
    return
  }
  handler(filePath, typings)
}
if (program.watch) {
  chokidar
    .watch(program.args, {})
    .on("add", compilePath)
    .on("change", compilePath)
} else {
  for (const globPattern of program.args) {
    for (const file of glob.sync(globPattern)) {
      compilePath(file)
    }
  }
}

/**
 * **Generates string with greeting**
 * @param {string} username **Username** for the greeting.
 */
function greeting(username: string) {
  return `Hello, ${username}!`
}
