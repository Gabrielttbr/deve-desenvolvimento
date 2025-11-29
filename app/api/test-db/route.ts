import { connectToDatabase } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Use the configured MongoDB connection
    const client = await connectToDatabase();
    
    // Test the connection with a ping
    const adminDb = client.db("admin");
    await adminDb.command({ ping: 1 });

    return NextResponse.json({
      success: true,
      message: "✅ MongoDB connection successful! Your database is ready.",
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      },
      { status: 500 }
    );
  }
}
