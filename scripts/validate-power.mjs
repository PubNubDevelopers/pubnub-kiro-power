import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const expectedFiles = [
  "POWER.md",
  "README.md",
  "LICENSE",
  "package.json",
  "mcp.json",
  "scripts/validate-power.mjs",
];

const steeringFiles = [
  "steering/build-realtime-apps.md",
  "steering/sdk-usage.md",
  "steering/chat-and-presence.md",
  "steering/access-control.md",
  "steering/functions-and-events.md",
  "steering/troubleshooting.md",
];

const allowedFrontmatterKeys = new Set([
  "name",
  "displayName",
  "description",
  "keywords",
  "author",
]);

const forbiddenFragments = [
  ["blo", "cks"],
  ["agent", "-card"],
  ["TO", "DO"],
  ["example", ".com"],
  ["your", "-org"],
];

const errors = [];

function fail(message) {
  errors.push(message);
}

async function readText(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function requireFile(relativePath) {
  if (!existsSync(path.join(root, relativePath))) {
    fail(`Missing required file: ${relativePath}`);
  }
}

for (const file of [...expectedFiles, ...steeringFiles]) {
  requireFile(file);
}

const power = await readText("POWER.md");
const match = power.match(/^---\n([\s\S]*?)\n---\n/);
if (!match) {
  fail("POWER.md must start with frontmatter.");
} else {
  const frontmatter = match[1];
  const topLevelKeys = [...frontmatter.matchAll(/^([A-Za-z][A-Za-z0-9]*):/gm)].map(item => item[1]);
  const unsupportedKeys = topLevelKeys.filter(key => !allowedFrontmatterKeys.has(key));

  if (unsupportedKeys.length > 0) {
    fail(`Unsupported POWER.md frontmatter keys: ${unsupportedKeys.join(", ")}`);
  }

  for (const key of allowedFrontmatterKeys) {
    if (!topLevelKeys.includes(key)) {
      fail(`POWER.md frontmatter is missing ${key}.`);
    }
  }

  if (!frontmatter.includes('name: "pubnub"')) {
    fail('POWER.md name must be "pubnub".');
  }

  if (!frontmatter.includes('displayName: "PubNub"')) {
    fail('POWER.md displayName must be "PubNub".');
  }

  if (!frontmatter.includes('author: "PubNub"')) {
    fail('POWER.md author must be "PubNub".');
  }
}

const readme = await readText("README.md");
for (const steeringFile of steeringFiles) {
  if (!readme.includes(steeringFile)) {
    fail(`README.md must reference ${steeringFile}.`);
  }
}

const mcp = JSON.parse(await readText("mcp.json"));
const pubnubServer = mcp?.mcpServers?.pubnub;
if (!pubnubServer) {
  fail("mcp.json must define mcpServers.pubnub.");
} else {
  if (pubnubServer.command !== "npx") {
    fail('mcp.json pubnub command must be "npx".');
  }

  const expectedArgs = ["-y", "@pubnub/mcp@latest"];
  if (JSON.stringify(pubnubServer.args) !== JSON.stringify(expectedArgs)) {
    fail(`mcp.json pubnub args must be ${JSON.stringify(expectedArgs)}.`);
  }

  const expectedEnv = [
    "PUBNUB_API_KEY",
    "PUBNUB_PUBLISH_KEY",
    "PUBNUB_SUBSCRIBE_KEY",
    "PUBNUB_USER_ID",
  ];

  for (const key of expectedEnv) {
    const value = pubnubServer.env?.[key];
    if (value !== `\${${key}}`) {
      fail(`mcp.json env ${key} must be a placeholder.`);
    }
  }

  for (const [key, value] of Object.entries(pubnubServer.env ?? {})) {
    if (typeof value !== "string" || !value.startsWith("${") || !value.endsWith("}")) {
      fail(`mcp.json env ${key} must not contain a real value.`);
    }
  }
}

const steeringEntries = await readdir(path.join(root, "steering"));
const actualSteering = steeringEntries
  .filter(name => name.endsWith(".md"))
  .map(name => `steering/${name}`)
  .sort();
const expectedSteering = [...steeringFiles].sort();
if (JSON.stringify(actualSteering) !== JSON.stringify(expectedSteering)) {
  fail("steering directory must contain exactly the expected Markdown files.");
}

const filesToScan = ["POWER.md", "README.md", ...steeringFiles];
for (const file of filesToScan) {
  const content = await readText(file);
  for (const fragments of forbiddenFragments) {
    const term = fragments.join("");
    if (content.toLowerCase().includes(term.toLowerCase())) {
      fail(`${file} contains stale or placeholder text: ${term}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.map(error => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("PubNub Kiro Power validation passed.");
