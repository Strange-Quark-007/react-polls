import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      exclude: [
        "*.config.js",
        "*.eslintrc.cjs",
        "src/vite-env.d.ts",
        "src/types.ts",
        "src/main.tsx",
      ],
    },
  },
});
