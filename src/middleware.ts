import { defineMiddleware } from 'astro:middleware'
import { getLocalizedPath } from './i18n/utils'
import { withBase } from './utils/url'

function stripBase(pathname: string): string {
	const base = import.meta.env.BASE_URL || '/'
	if (base === '/' || !pathname.startsWith(base)) {
		return pathname
	}
	const trimmed = pathname.slice(base.length)
	return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

function prefersPortuguese(acceptLanguage: string | null): boolean {
	if (!acceptLanguage) return false
	return acceptLanguage
		.split(',')
		.map((part) => part.trim().toLowerCase())
		.some((lang) => lang.startsWith('pt'))
}

export const onRequest = defineMiddleware(async (context, next) => {
	const { url, request } = context
	const pathWithoutBase = stripBase(url.pathname)

	if (pathWithoutBase === '/pt/contact' || pathWithoutBase === '/pt/contact/') {
		const location = withBase(getLocalizedPath('contact', 'pt'))
		return new Response(null, {
			status: 301,
			headers: {
				Location: location
			}
		})
	}

	if (pathWithoutBase.startsWith('/pt')) {
		return next()
	}

	if (pathWithoutBase === '/' && (request.method === 'GET' || request.method === 'HEAD')) {
		const acceptLanguage =
			request.headers.get('accept-language') || request.headers.get('Accept-Language') || ''

		if (prefersPortuguese(acceptLanguage)) {
			const location = withBase(getLocalizedPath('/', 'pt'))
			return new Response(null, {
				status: 302,
				headers: {
					Location: location,
					Vary: 'Accept-Language'
				}
			})
		}
	}

	return next()
})
