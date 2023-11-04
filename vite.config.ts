import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import basicSsl from '@vitejs/plugin-basic-ssl'

// import devManifest from 'vite-plugin-dev-manifest';

export default defineConfig({
	plugins: [
		// devManifest(),
		sveltekit(),
		basicSsl()
	],
	server: {
		port: 4200,
		proxy: {

			'/dev/api': {
				target: 'http://mark8t.ca/', // Replace with your proxy server URL
				changeOrigin: true,
				secure: true, // Set to false if you're having issues with SSL/TLS
				rewrite: (path) => path.replace(/^\/dev\/api/, ''),
			}
			// '/dev/2/dev/api': 'http://mark8t.ca/'
		},

		fs: {
			strict: false,
			allow: [
				// search up for workspace root
				// searchForWorkspaceRoot(process.cwd()),
				// your custom rules
				'../@mark8t/core/src/lib/index.js',
			],
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['tests/unit/**/*.{test,spec}.{js,ts}']
	}
});
