import type { AstroGlobal } from 'astro'

export type Locale = 'en' | 'pt'

export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'pt']

const localizedSlugs: Record<Locale, Record<string, string>> = {
	en: {
		contact: 'contact'
	},
	pt: {
		contact: 'contato'
	}
}

function localizePath(pathname: string, locale: Locale): string {
	const segments = pathname.split('/').filter(Boolean)
	if (segments.length === 0) {
		return '/'
	}

	const [firstSegment, ...rest] = segments
	const localizedFirstSegment = localizedSlugs[locale]?.[firstSegment] || firstSegment
	return '/' + [localizedFirstSegment, ...rest].join('/')
}

/**
 * Strip the base path from the pathname
 */
function stripBase(pathname: string): string {
	const base = import.meta.env.BASE_URL
	if (pathname.startsWith(base)) {
		return pathname.slice(base.length)
	}
	// Handle case where pathname doesn't have trailing slash but base does
	if (base.endsWith('/') && pathname === base.slice(0, -1)) {
		return ''
	}
	return pathname
}

/**
 * Get the current locale from the URL pathname
 */
export function getLocaleFromPath(pathname: string): Locale {
	const cleanPath = stripBase(pathname)
	const segments = cleanPath.split('/').filter(Boolean)
	const firstSegment = segments[0]

	if (locales.includes(firstSegment as Locale)) {
		return firstSegment as Locale
	}

	return defaultLocale
}

/**
 * Get the current locale from Astro request
 */
export function getLocale(Astro: AstroGlobal): Locale {
	return getLocaleFromPath(Astro.url.pathname)
}

/**
 * Get the pathname without locale prefix
 */
export function getPathnameWithoutLocale(pathname: string): string {
	const cleanPath = stripBase(pathname)
	const segments = cleanPath.split('/').filter(Boolean)
	
	if (segments.length === 0) {
		return '/'
	}
	
	const firstSegment = segments[0]

	if (locales.includes(firstSegment as Locale)) {
		const remaining = segments.slice(1)
		return remaining.length === 0 ? '/' : '/' + remaining.join('/')
	}

	// Return the path relative to base (without base prefix)
	return cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath
}

/**
 * Get the localized path for a given path
 */
export function getLocalizedPath(path: string, locale: Locale): string {
	// Normalize the path
	let cleanPath = path.startsWith('/') ? path : '/' + path
	if (cleanPath !== '/' && cleanPath.endsWith('/')) {
		cleanPath = cleanPath.slice(0, -1)
	}
	
	// Remove locale prefix if present
	const pathWithoutLocale = getPathnameWithoutLocale(cleanPath)
	const localizedPathWithoutLocale = localizePath(pathWithoutLocale, locale)

	// For default locale, return path without prefix
	if (locale === defaultLocale) {
		return localizedPathWithoutLocale
	}

	// For non-default locale, add prefix
	if (localizedPathWithoutLocale === '/') {
		return `/${locale}`
	}

	return `/${locale}${localizedPathWithoutLocale}`
}

