// scripts/prepare-capacitor.js
const fs = require("fs-extra");
const path = require("path");

const sourceDir = path.join(__dirname, "..", ".next");
const targetDir = path.join(__dirname, "..", "mobile_www");

console.log("Copying .next to mobile_www for Capacitor...");

fs.emptyDirSync(targetDir);
fs.copySync(sourceDir, targetDir);

console.log("✅ Capacitor web assets prepared.");