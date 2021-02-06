//https://github.com/rollup/plugins

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/main.js',
    plugins: [
        
        nodeResolve({
        browser: true,
        dedupe: [ 'svelte' ]
    }), 
    json(),
    
    commonjs({
        esmExternals: true,
        transformMixedEsModules: true
    })

],
    output: [
        { file: "dist/scripts.js", format: "iife" }
    ],
    
};