#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const [dir, pattern, replacement] = process.argv.slice(2);
const isDry = !process.argv.includes("--run");
if (!dir || !pattern || replacement === undefined || dir === "-h" || dir === "--help") {
  console.log("Usage: bulk-rename <dir> <find-regex> <replace-with> [--run]");
  console.log("Example: bulk-rename ./photos "img_" "pic_" --run");
  process.exit(dir ? 0 : 1);
}
const re = new RegExp(pattern);
let renamed = 0;
fs.readdirSync(dir).forEach(file => {
  if (re.test(file)) {
    const newName = file.replace(re, replacement);
    const oldP = path.join(dir, file);
    const newP = path.join(dir, newName);
    console.log(`${file} -> \x1b[32m${newName}\x1b[0m`);
    if (!isDry) {
      fs.renameSync(oldP, newP);
    }
    renamed++;
  }
});
if (isDry) console.log(`\n\x1b[33m[Dry Run] ${renamed} file(s) would be renamed. Add '--run' to apply.\x1b[0m`);
else console.log(`\n\x1b[32m✔ Successfully renamed ${renamed} file(s)!\x1b[0m`);
