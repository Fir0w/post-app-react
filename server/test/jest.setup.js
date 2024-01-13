import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = await MongoMemoryServer.create();

// Set MONGODB_URI_TEST environment variable for your application
process.env.MONGODB_URI_TEST = mongod.getUri();