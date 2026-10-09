import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const repoRoot = path.resolve(projectRoot, "..");
const outDir = path.join(projectRoot, "out");
const dropDir = path.join(repoRoot, "netlify-drop");
const proxyPath = path.join(projectRoot, "src", "proxy.ts");
const disabledProxyPath = path.join(projectRoot, "src", "proxy.ts.netlify-drop");
const restPath = path.join(projectRoot, "src", "app", "[locale]", "[...rest]");
const disabledRestPath = path.join(projectRoot, "src", "[...rest].netlify-drop");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    env: {
      ...process.env,
      NEXT_OUTPUT_EXPORT: "1",
      NEXT_TELEMETRY_DISABLED: "1",
    },
    stdio: "inherit",
    ...options,
  });

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed`);
  }
}

function removeDirectory(directory) {
  fs.rmSync(directory, { force: true, recursive: true });
}

function disableProxy() {
  if (!fs.existsSync(proxyPath)) return false;
  fs.renameSync(proxyPath, disabledProxyPath);
  return true;
}

function restoreProxy(wasDisabled) {
  if (!wasDisabled || !fs.existsSync(disabledProxyPath)) return;
  fs.renameSync(disabledProxyPath, proxyPath);
}

function disableRestRoute() {
  if (!fs.existsSync(restPath)) return false;
  fs.renameSync(restPath, disabledRestPath);
  return true;
}

function restoreRestRoute(wasDisabled) {
  if (!wasDisabled || !fs.existsSync(disabledRestPath)) return;
  fs.renameSync(disabledRestPath, restPath);
}

function prepareDropFolder() {
  removeDirectory(dropDir);
  fs.cpSync(outDir, dropDir, { recursive: true });
  fs.writeFileSync(path.join(dropDir, "_redirects"), "/ /fr/ 302\n");
}

let proxyWasDisabled = false;
let restWasDisabled = false;

try {
  removeDirectory(outDir);
  proxyWasDisabled = disableProxy();
  restWasDisabled = disableRestRoute();
  run("npm", ["run", "build"]);
  prepareDropFolder();
  console.log(`\nNetlify drag and drop folder ready: ${dropDir}\n`);
} finally {
  restoreRestRoute(restWasDisabled);
  restoreProxy(proxyWasDisabled);
}
