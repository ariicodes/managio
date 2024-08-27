import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
	console.warn(
		'Twilio credentials are not set. SMS functionality will not work.'
	);
}

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export async function sendSMS(to: string, body: string): Promise<void> {
	if (!client) {
		console.warn('Twilio client is not initialized. SMS will not be sent.');
		return;
	}

	try {
		await client.messages.create({
			body,
			to,
			from: process.env.TWILIO_PHONE_NUMBER,
		});
	} catch (error) {
		console.error('Failed to send SMS:', error);
	}
}
