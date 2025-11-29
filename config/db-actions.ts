"use server"

import { connectToDatabase } from "@/config/db";

export async function testDatabaseConnection() {
  try {
    const client = await connectToDatabase();
    const adminDb = client.db("admin");
    await adminDb.command({ ping: 1 });
    return { success: true, message: "Connection successful!" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}