import connectMongodb from "@/lib/mongodb";
import users from "@/models/usersSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Safely access the email parameter
    const email = params?.email;

    // Validate email parameter
    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongodb();

    // Find the user by email
    const user = await users.findOne({ email }).exec();
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if the user is an admin
    const isAdmin = user.role === "admin";

    // Return response
    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
