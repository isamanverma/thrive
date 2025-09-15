import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/generated/**",
      "public/**",
      "prisma/**",
      "scripts/**"
    ],
  },
  {
    // Reduce noisy rules and adjust behavior for generated files
    rules: {
      // common developer noise -> warn instead of error
      "no-console": "warn",
      "no-debugger": "warn",
  
      // prefer TS-specific rule; keep as warning and allow unused variables starting with _
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
  
      // React / JSX
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-key": "warn",
  
      // imports / build noise
      "import/no-extraneous-dependencies": "off",
  
      // accessibility rule exceptions (if noisy in this project)
      "jsx-a11y/anchor-is-valid": "off",
  
      // optional: disable some opinionated/fussy rules if present in extended configs
      "unicorn/prevent-abbreviations": "off"
    }
  },
  {
    files: ["src/generated/**", "public/**", "prisma/**", "scripts/**"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-undef": "off"
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-unused-vars": "off"
    }
  },
  {
    files: ["src/app/api/**"],
    rules: {
      "no-console": "off"
    }
  }
];

export default eslintConfig;
