import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "**/bootstrap_hack.js",
        "**/obfuscate/",
        "**/dist/",
        "**/bitburner/",
        "**/bootstrap/",
        "**/NetscriptDefinitions.d.ts",
        "**/NetscriptExtras.d.ts",
        "**/vite.config.js",
        "**/eslint.config.mjs",
        "**/capabilities/",
        "**/pkg/",
        "**/hacks/",
        "**/ts/",
        "**/custom.d.ts",
    ],
}, ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/strict"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            React: "readonly",
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "module",

        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: "./",
        },
    },

    rules: {
        "@typescript-eslint/no-floating-promises": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
    },
}];