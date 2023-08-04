import resolvePlugin from "@rollup/plugin-node-resolve"
import { babel as babelPlugin } from "@rollup/plugin-babel"
import typescriptPlugin from "@rollup/plugin-typescript"
import { defineConfig } from "rollup"
import { terser as terserPlugin } from "rollup-plugin-terser"
import dtsPlugin from "rollup-plugin-dts"

// const output = './dist/libs/react-rollup'
const main = "dist/cjs/index.js"
const module = "dist/esm/index.js"

export default defineConfig([
  // Transpile sources to type definitions
  {
    input: "src/index.ts",
    output: [
      {
        file: module,
        format: "esm",
        sourcemap: true,
      }
    ],
    // external: Object.keys(packageJson.peerDependencies),
    external: ['react', 'react/jsx-runtime', 'styled-jsx'],
    plugins: [
      resolvePlugin({
        extensions: [".ts", ".tsx"/*, ".js", ".jsx"*/]
      }),
      typescriptPlugin({ tsconfig: "./tsconfig.lib.json" }),
    ],
  },

  // Transpile sources to CJS and ESM
  {
    input: "src/index.ts",
    output: [
      {
        file: main,
        format: "cjs",
        plugins: [terserPlugin()],
        sourcemap: true,
      },
      {
        file: module,
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
        extensions: [".ts", ".tsx"/*, ".js", ".jsx"*/],
        presets: [
          [
            '@babel/preset-react',
            {
              runtime: 'automatic',
            },
          ],
        ],
      }),
    ],
  },

  // Concat type definitions into a single file
  // {
  //   input: "./dist/esm/types/src/index.d.ts",
  //   output: { file: "dist/index.d.ts", format: "esm" },
  //   plugins: [
  //     dtsPlugin()
  //   ],
  // }
])
