import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const input = "src/index.tsx"

export default [
    {
        input: input,
        output: {
            name: pkg.name,
            file: `dist/${pkg.name}.dev.js`,
            format: "cjs",
            exports: "named",
        },
        plugins: [
            resolve({
                browser: true,
                preferBuiltins: true,
                extensions: [".mjs", ".js", ".jsx",".tsx"],
              }),
            external(),
            babel({
                exclude: "node_modules/**"
            }),
            commonjs({
                include: "node_modules/**",
            }),
            typescript({
                typescript: require("typescript"),
              })
          ],
        external: ["react", "react-dom"]
    },
    {
        input: input,
        output: {
            name:pkg.name,
            file: pkg.main,
            format: "cjs",
            exports: "named",
        },
        plugins: [
            resolve({
                browser: true,
                preferBuiltins: true,
                extensions: [".mjs", ".js", ".jsx",".tsx"],
              }),
            external(),
            babel({
                exclude: "node_modules/**"
            }),
            commonjs({
                include: "node_modules/**",
            }),
            uglify(),
            typescript({
                typescript: require("typescript"),
              })
          ],
        external: ["react", "react-dom"]
    },
    {
        input: input,
        output: {
            name:pkg.name,
            file: pkg.module,
            format: "es",
            exports: "named",
        },
        plugins: [
            resolve({
                browser: true,
                preferBuiltins: true,
                extensions: [".mjs", ".js", ".jsx",".tsx"],
              }),
            external(),
            babel({
                exclude: "node_modules/**"
            }),
            commonjs({
                include: "node_modules/**",
            }),
            terser(),
            typescript({
                typescript: require("typescript"),
              })
          ],
        external: ["react", "react-dom"]
    },
    {
        input: input,
        output: {
            name: pkg.name,
            file: `dist/${pkg.name}.umd.js`,
            format: "umd",
            globals: {
                react: "React",
            },
            exports: "named",
        },
        plugins: [
            resolve({
                browser: true,
                preferBuiltins: true,
                extensions: [".mjs", ".js", ".jsx",".tsx"],
              }),
            external(),
            babel({
                exclude: "node_modules/**"
            }),
            commonjs({
                include: "node_modules/**",
            }),
            uglify({}),
            typescript({
                typescript: require("typescript"),
              })
          ],
        external: ["react", "react-dom"]
    }
]
