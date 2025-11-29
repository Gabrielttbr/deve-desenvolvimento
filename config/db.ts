// config/db.tsx
import { MongoClient, ServerApiVersion } from "mongodb";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_DB || '';

if (!MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  cachedClient = client;
  return client;
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
  }
}

export default connectToDatabase;