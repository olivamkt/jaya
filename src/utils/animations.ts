/**
 * Animate element when it becomes visible using Intersection Observer
 * @param elementId - ID of the element to animate
 * @param options - Intersection Observer options
 */
export const animateOnScroll = (
	elementId: string,
	options: IntersectionObserverInit = {}
): void => {
	const element = document.getElementById(elementId)
	if (!element) return

	const defaultOptions: IntersectionObserverInit = {
		threshold: 0.2,
		rootMargin: '0px',
		...options
	}

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				element.classList.add('visible')
				observer.unobserve(entry.target)
			}
		})
	}

	const observer = new IntersectionObserver(handleIntersection, defaultOptions)
	observer.observe(element)
}

/**
 * Animate element when its parent/section becomes visible
 * @param sectionSelector - CSS selector for the section to observe
 * @param elementId - ID of the element to animate
 * @param options - Intersection Observer options
 */
export const animateOnSectionVisible = (
	sectionSelector: string,
	elementId: string,
	options: IntersectionObserverInit = {}
): void => {
	const section = document.querySelector(sectionSelector)
	const element = document.getElementById(elementId)

	if (!section || !element) return

	const defaultOptions: IntersectionObserverInit = {
		threshold: 0.2,
		rootMargin: '0px',
		...options
	}

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				element.classList.add('visible')
				observer.unobserve(entry.target)
			}
		})
	}

	const observer = new IntersectionObserver(handleIntersection, defaultOptions)
	observer.observe(section)
}
