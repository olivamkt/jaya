import { ActionError, defineAction } from 'astro:actions'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
	send: defineAction({
		accept: 'form',
		handler: async (input) => {
			const { name, email, message } = input as unknown as {
				name: string
				email: string
				message: string
			}

			// Validate required fields
			if (!name || !email || !message) {
				throw new ActionError({
					code: 'BAD_REQUEST',
					message: 'All fields are required'
				})
			}

			// Validate email format
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailRegex.test(email)) {
				throw new ActionError({
					code: 'BAD_REQUEST',
					message: 'Invalid email format'
				})
			}

			// Get email configuration from environment variables
			const EMAIL_FROM = import.meta.env.EMAIL_FROM || 'noreply@jaya.tech'
			const EMAIL_TO = import.meta.env.EMAIL_TO || 'pareja.r@gmail.com'

			// Send email using Resend
			const { data, error } = await resend.emails.send({
				from: EMAIL_FROM,
				to: [EMAIL_TO],
				subject: `New Contact Form Submission from ${name}`,
				html: `
					<h2>New Contact Form Submission</h2>
					<p><strong>Name:</strong> ${name}</p>
					<p><strong>Email:</strong> ${email}</p>
					<p><strong>Message:</strong></p>
					<p>${message.replace(/\n/g, '<br>')}</p>
				`
			})

			if (error) {
				throw new ActionError({
					code: 'BAD_REQUEST',
					message: error.message || 'Failed to send email'
				})
			}

			return data
		}
	})
}
