import resolvePlugin from "@rollup/plugin-node-resolve"
import {babel as babelPlugin} from "@rollup/plugin-babel"
import typescriptPlugin from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"
import {terser as terserPlugin} from "rollup-plugin-terser"

const output = './dist/libs/react-rollup'

export default defineConfig([
  // Transpile sources to type definitions
  {
    input: "src/index.ts",
    output: [
      {
        file: output,
        format: "esm",
        sourcemap: true,
      }
    ],
    // external: Object.keys(packageJson.peerDependencies),
    plugins: [
      resolvePlugin({
        extensions: [".ts", ".tsx"/*, ".js", ".jsx"*/]
      }),
      typescriptPlugin({tsconfig: "./tsconfig.json"}),
    ],
  },

  // Transpile sources to CJS and ESM
  {
    input: "src/index.ts",
    output: [
      {
        file: output,
        format: "cjs",
        plugins: [terserPlugin()],
        sourcemap: true,
      },
      {
        file: output,
        format: "esm",
        plugins: [terserPlugin()],
        sourcemap: true,
      }
    ],
    // external: Object.keys(packageJson.peerDependencies),
    plugins: [
      resolvePlugin({
        extensions: [".ts", ".tsx"/*, ".js", ".jsx"*/]
      }),
      babelPlugin({
        babelHelpers: "bundled",
        extensions: [".ts", ".tsx"/*, ".js", ".jsx"*/]
      }),
    ],
  },

  // Concat type definitions into a single file
  // {
  //   input: "dist/esm/types/src/index.d.ts",
  //   output: {file: "dist/index.d.ts", format: "esm"},
  //   plugins: [
  //     dtsPlugin()
  //   ],
  // }
])
