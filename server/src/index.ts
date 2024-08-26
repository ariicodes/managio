import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import dotenv from 'dotenv';

dotenv.config();

async function startApolloServer() {
	const app = express();
	const server = new ApolloServer({ typeDefs, resolvers });

	await server.start();

	server.applyMiddleware({ app });

	app.listen({ port: 4000 }, () =>
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
	);
}

startApolloServer();
