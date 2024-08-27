import { Event, UserInput } from '../types';
import { pool } from '../config/db';
import { redisClient } from '../config/redis';

export async function getEvents(): Promise<Event[]> {
	try {
		const cachedEvents = await redisClient.get('events');
		if (cachedEvents) {
			return JSON.parse(cachedEvents);
		}
	} catch (error) {
		console.error('Redis get error:', error);
	}

	const { rows } = await pool.query('SELECT * FROM events');

	try {
		await redisClient.set('events', JSON.stringify(rows), {
			EX: 3600, // Cache for 1 hour
		});
	} catch (error) {
		console.error('Redis set error:', error);
	}

	return rows;
}

export async function getEventById(id: string): Promise<Event | null> {
	const { rows } = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
	return rows[0] || null;
}

export async function createRegistration(
	eventId: string,
	userData: UserInput
): Promise<boolean> {
	const { rows } = await pool.query(
		'INSERT INTO registrations (event_id, user_name, user_email, user_phone) VALUES ($1, $2, $3, $4) RETURNING id',
		[eventId, userData.name, userData.email, userData.phone]
	);
	return rows.length > 0;
}
