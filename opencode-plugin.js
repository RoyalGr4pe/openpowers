import { readdir, readFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Plugin } from "@opencode/plugin";
import { parse as parseYaml } from "yaml";

const pluginRoot = dirname(fileURLToPath(import.meta.url));

const profiles = Object.freeze({
  base: ["base"],
  nextjs: ["base", "nextjs"],
  turborepo: ["base", "turborepo"],
  "nextjs-turbo": ["base", "nextjs", "turborepo"],
});

function selectedProfile(options) {
  const configuredProfile =
    typeof options?.profile === "string" ? options.profile.trim() : "";
  const requestedProfile =
    configuredProfile || process.env.OPENPOWERS_PROFILE?.trim() || "base";

  if (Object.hasOwn(profiles, requestedProfile)) {
    return requestedProfile;
  }

  console.warn(
    `[openpowers] Unknown profile "${requestedProfile}". Falling back to "base".`,
  );
  return "base";
}

function skillDirectoriesFor(profile) {
  return profiles[profile].map((group) => join(pluginRoot, "skills", group));
}

async function findSkillFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries.sort((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findSkillFiles(path)));
    } else if (entry.isFile() && entry.name === "SKILL.md") {
      files.push(path);
    }
  }

  return files;
}

function splitFrontmatter(source, path) {
  if (!source.startsWith("---")) {
    return { attributes: {}, content: source };
  }

  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    throw new Error(`[openpowers] Invalid YAML frontmatter in ${path}`);
  }

  const attributes = parseYaml(match[1]) ?? {};
  if (typeof attributes !== "object" || Array.isArray(attributes)) {
    throw new Error(`[openpowers] Frontmatter must be a map in ${path}`);
  }

  return {
    attributes,
    content: source.slice(match[0].length),
  };
}

function modelInvocationSetting(attributes) {
  const metadata = attributes.metadata;

  if (
    metadata &&
    typeof metadata === "object" &&
    !Array.isArray(metadata) &&
    typeof metadata["opencode/autoinvoke"] === "boolean"
  ) {
    return metadata["opencode/autoinvoke"];
  }

  if (typeof attributes["disable-model-invocation"] === "boolean") {
    return !attributes["disable-model-invocation"];
  }

  return undefined;
}

async function loadSkill(path) {
  const source = await readFile(path, "utf8");
  const { attributes, content } = splitFrontmatter(source, path);
  const id = basename(dirname(path));
  const name = typeof attributes.name === "string" ? attributes.name : id;
  const description =
    typeof attributes.description === "string"
      ? attributes.description
      : undefined;
  const autoinvoke = modelInvocationSetting(attributes);

  return {
    id,
    name,
    ...(description === undefined ? {} : { description }),
    ...(autoinvoke === undefined ? {} : { autoinvoke }),
    path,
    content,
  };
}

async function loadProfileSkills(profile) {
  const skills = new Map();

  for (const directory of skillDirectoriesFor(profile)) {
    for (const path of await findSkillFiles(directory)) {
      const skill = await loadSkill(path);
      skills.set(skill.id, skill);
    }
  }

  return [...skills.values()];
}

const OpenPowersPlugin = Plugin.define({
  id: "openpowers",
  async setup(ctx) {
    const skills = await loadProfileSkills(selectedProfile(ctx.options));

    await ctx.skill.transform((editor) => {
      for (const skill of skills) {
        editor.add(skill);
      }
    });
  },
});

export { OpenPowersPlugin };
export default OpenPowersPlugin;
