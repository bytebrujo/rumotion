import { makeConfig } from "@picus/eslint-config-flat";

const conf = makeConfig({
  picusDir: ["app/picus/**"],
});

export default [
  {
    ignores: [".react-router", "deploy.mjs"],
  },
  ...conf,
];
