import { Event, UserInput } from '../types';
import {
	getEvents,
	getEventById,
	createRegistration,
} from '../services/eventService';
import { sendSMS } from '../utils/twilioClient';

export const resolvers = {
	Query: {
		events: async () => {
			return await getEvents();
		},
		event: async (_: any, { id }: { id: string }) => {
			return await getEventById(id);
		},
	},
	Mutation: {
		registerForEvent: async (
			_: any,
			{ eventId, userData }: { eventId: string; userData: UserInput }
		) => {
			const success = await createRegistration(eventId, userData);
			if (success) {
				await sendSMS(
					userData.phone,
					`You have successfully registered for the event!`
				);
			}
			return success;
		},
	},
};
