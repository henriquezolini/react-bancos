import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/data.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ["react"],
});
