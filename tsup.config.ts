import { defineConfig } from 'tsup';
 
export default defineConfig({
    format: ['esm'],
    entry: ['./src/index.ts'],
    dts: true,
    skipNodeModulesBundle: true,
    clean: true,
});