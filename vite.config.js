import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url';

import wasm from "vite-plugin-wasm";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: fileURLToPath(new URL('./src/main.ts', import.meta.url)),
      name: 'timeburn',
      // the proper extensions will be added
      fileName: 'timeburn',
      formats: ['es'],
    },
    target: 'esnext',
    minify: false,
  },
  plugins: [
    wasm(),
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    }
  },
  resolve: {
    alias: [
      { find: '@rust', replacement: fileURLToPath(new URL('./pkg/timeburn.js', import.meta.url)) },
      { find: '@ns', replacement: fileURLToPath(new URL('./NetscriptDefinitions.d.ts', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})
