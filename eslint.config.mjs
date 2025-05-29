// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import storybook from "eslint-plugin-storybook";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  {
    ignores: ['node_modules', 'dist', '.next'],
  },
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  ...compat.extends('@titicaca/eslint-config-triple'),
  ...compat.extends('@titicaca/eslint-config-triple/requiring-type-checking'),
  ...compat.extends('@titicaca/eslint-config-triple/frontend'),
  ...compat.extends('@titicaca/eslint-config-triple/prettier'),
  ...storybook.configs["flat/recommended"],
  {
    // 👇 This should match the `stories` property in .storybook/main.js|ts
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    rules: {
      // 👇 Enable this rule
      'storybook/csf-component': 'error',
      // 👇 Disable this rule
      'storybook/default-exports': 'off',
    },
  },
];

export default eslintConfig;
