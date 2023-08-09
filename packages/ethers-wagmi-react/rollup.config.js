import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json" assert { type: "json" };

export default [
  {
    input: ["./src/index.ts"],
    external: Object.keys(pkg.dependencies),
    output: {
      file: pkg.exports["."],
      format: "esm",
      sourcemap: false,
    },
    plugins: [peerDepsExternal(), typescript()],
  },
];
