/**
 * Centralized social media and external links configuration
 * Update these links here and they will be reflected across the entire site
 */

export const socialLinks = {
	linkedin: 'https://www.linkedin.com/company/jaya-apps',
	github: 'https://github.com/jaya',
	medium: 'https://jayaj.medium.com'
} as const

export type SocialLink = keyof typeof socialLinks
