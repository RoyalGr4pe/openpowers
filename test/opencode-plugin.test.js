import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import plugin from "../opencode-plugin.js";

const originalProfile = process.env.OPENPOWERS_PROFILE;

afterEach(() => {
  if (originalProfile === undefined) {
    delete process.env.OPENPOWERS_PROFILE;
  } else {
    process.env.OPENPOWERS_PROFILE = originalProfile;
  }
});

async function registeredSkills(profile, { useEnvironment = false } = {}) {
  if (useEnvironment) process.env.OPENPOWERS_PROFILE = profile;
  const skills = [];

  await plugin.setup({
    options: useEnvironment ? {} : { profile },
    skill: {
      async transform(transform) {
        transform({
          add(skill) {
            skills.push(skill);
          },
        });
      },
    },
  });

  return skills;
}

test("exports an OpenCode V2 plugin", () => {
  assert.equal(plugin.id, "openpowers");
  assert.equal(typeof plugin.setup, "function");
});

test("registers the base profile as V2 skills", async () => {
  const skills = await registeredSkills("base");

  assert.equal(skills.length, 8);
  assert.deepEqual(
    skills.map((skill) => skill.id),
    [
      "browser-review",
      "completion",
      "debugging",
      "development-cycle",
      "execution",
      "maintenance",
      "planning",
      "review",
    ],
  );
  assert.ok(skills.every((skill) => skill.path.endsWith("/SKILL.md")));
  assert.ok(skills.every((skill) => !skill.content.startsWith("---")));
  assert.ok(skills.every((skill) => skill.description?.startsWith("Use when")));
});

test("composes profile skill groups", async () => {
  const nextjs = await registeredSkills("nextjs");
  const turborepo = await registeredSkills("turborepo");
  const combined = await registeredSkills("nextjs-turbo");

  assert.equal(nextjs.length, 15);
  assert.equal(turborepo.length, 11);
  assert.equal(combined.length, 18);
  assert.ok(combined.some((skill) => skill.id === "nextjs-app-router"));
  assert.ok(combined.some((skill) => skill.id === "turborepo-workspace"));
});

test("supports the environment variable as a fallback", async () => {
  const skills = await registeredSkills("turborepo", { useEnvironment: true });

  assert.equal(skills.length, 11);
  assert.ok(skills.some((skill) => skill.id === "turborepo-workspace"));
});
