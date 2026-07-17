import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        sveltekit({
            compilerOptions: {
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true
            },
            adapter: adapter({
                runtime: 'nodejs24.x',
                images: {
                    sizes: [640, 828, 1200, 1920, 3840],
                    formats: ['image/avif', 'image/webp'],
                    minimumCacheTTL: 300,
                    domains: ['example-app.vercel.app'],
                }
            }),
            preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
            extensions: ['.svelte', '.svx', '.md'],
            typescript: {
                config: (config) => {
                    config.include.push('../drizzle.config.ts');
                }
            }
        })
    ]
});
