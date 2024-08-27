import { createClient } from 'redis';

export const redisClient = createClient({
	url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', err => console.log('Redis Client Error', err));

(async () => {
	try {
		await redisClient.connect();
		console.log('Connected to Redis');
	} catch (err) {
		console.error('Failed to connect to Redis:', err);
	}
})();

process.on('SIGINT', () => {
	redisClient.quit();
});

export default redisClient;
