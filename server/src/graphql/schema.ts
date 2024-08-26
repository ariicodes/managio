import { gql } from 'apollo-server-express';

export const typeDefs = gql`
	type Event {
		id: ID!
		name: String!
		date: String!
		location: String!
		description: String
	}

	input UserInput {
		name: String!
		email: String!
		phone: String!
	}

	type Query {
		events: [Event!]!
		event(id: ID!): Event
	}

	type Mutation {
		registerForEvent(eventId: ID!, userData: UserInput!): Boolean!
	}
`;
