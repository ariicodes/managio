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
			try {
				const success = await createRegistration(eventId, userData);
				if (success) {
					try {
						await sendSMS(
							userData.phone,
							`You have successfully registered for the event!`
						);
					} catch (error) {
						console.error('Failed to send SMS:', error);
						// You might want to log this or handle it in some way, but don't fail the registration
					}
				}
				return success;
			} catch (error) {
				console.error('Failed to register for event:', error);
				throw new Error('Failed to register for event');
			}
		},
	},
};
