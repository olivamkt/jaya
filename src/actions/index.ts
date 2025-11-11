import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
	send: defineAction({
		accept: 'form',
		input: z.object({
			name: z.string().min(1, 'Name is required'),
			email: z.string().email('Invalid email format'),
			message: z.string().min(1, 'Message is required')
		}),
		handler: async (input) => {
			const { name, email, message } = input

			// Get email configuration from environment variables
			// resend test from: onboarding@resend.dev
			const EMAIL_FROM = import.meta.env.EMAIL_FROM || 'automation@jaya.tech'
			const EMAIL_TO = import.meta.env.EMAIL_TO || 'contact@jaya.tech'

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
