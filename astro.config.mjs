// @ts-check
import { defineConfig } from 'astro/config'

import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'

import node from '@astrojs/node'

import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
	site: 'https://olivamkt.github.io/jaya/',
	base: '/jaya/',
	output: 'static', // Static by default, only contact page will be SSR

	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
		routing: {
			prefixDefaultLocale: false
		}
	},

	integrations: [
		react(),
		sitemap({
			i18n: {
				defaultLocale: 'en',
				locales: {
					en: 'en-US'
				}
			}
		}),
		robotsTxt(),
		partytown()
	],

	vite: {
		// @ts-expect-error - Tailwind Vite plugin version mismatch with Astro's Vite version
		plugins: [tailwindcss()],
		server: {
			watch: {
				usePolling: true
			}
		},
		css: {
			modules: {
				localsConvention: 'camelCaseOnly'
			}
		}
	},

	adapter: node({
		mode: 'standalone'
	})
})
