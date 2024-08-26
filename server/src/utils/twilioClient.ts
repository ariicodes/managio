import twilio from 'twilio';

const client = twilio(
	process.env.TWILIO_ACCOUNT_SID,
	process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to: string, body: string): Promise<void> {
	await client.messages.create({
		body,
		to,
		from: process.env.TWILIO_PHONE_NUMBER,
	});
}
