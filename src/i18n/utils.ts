import { ui, defaultLang } from './ui'

// Base URL do projeto (deve corresponder ao config do Astro)
const BASE_URL = '/jaya/'

export function getLangFromUrl(url: URL) {
	// Remove o base URL do pathname antes de extrair o idioma
	const pathWithoutBase = url.pathname.startsWith(BASE_URL)
		? url.pathname.slice(BASE_URL.length - 1) // Remove '/jaya' mas mantém a '/'
		: url.pathname

	const [, lang] = pathWithoutBase.split('/')
	if (lang in ui) return lang as keyof typeof ui
	return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: string) {
		return getNestedValue(ui[lang], key) || getNestedValue(ui[defaultLang], key)
	}
}

// Obtiene un valor anidado de un objeto usando una ruta como 'home.content.1.title'
function getNestedValue(obj: any, path: string) {
	return path.split('.').reduce((prev, curr) => {
		return prev ? prev[curr] : null
	}, obj)
}

export function getTranslatedPath(path: string, lang: string) {
	const pathWithoutLeadingSlash = path.startsWith('/') ? path.slice(1) : path

	// Si estamos en la ruta raíz
	if (pathWithoutLeadingSlash === '') {
		if (lang === defaultLang) return `${BASE_URL}`
		return `${BASE_URL}${lang}/`
	}

	if (lang === defaultLang) return `${BASE_URL}${pathWithoutLeadingSlash}`
	return `${BASE_URL}${lang}/${pathWithoutLeadingSlash}`
}
