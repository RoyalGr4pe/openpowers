import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pluginRoot = dirname(fileURLToPath(import.meta.url));

const profiles = Object.freeze({
  base: ["base"],
  nextjs: ["base", "nextjs"],
  turborepo: ["base", "turborepo"],
  "nextjs-turbo": ["base", "nextjs", "turborepo"],
});

function selectedProfile() {
  const requestedProfile = process.env.OPENPOWERS_PROFILE?.trim() || "base";

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

export const OpenPowersPlugin = async () => {
  return {
    config(config) {
      config.skills ??= {};
      config.skills.paths ??= [];

      for (const skillDirectory of skillDirectoriesFor(selectedProfile())) {
        if (!config.skills.paths.includes(skillDirectory)) {
          config.skills.paths.push(skillDirectory);
        }
      }
    },
  };
};

export default OpenPowersPlugin;
