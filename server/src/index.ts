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

	const PORT = process.env.PORT || 4000;
	app.listen(PORT, () =>
		console.log(
			`🚀 Server ready on PORT: ${PORT}`
		)
	);
}

startApolloServer().catch(err => console.error('Failed to start server:', err));
