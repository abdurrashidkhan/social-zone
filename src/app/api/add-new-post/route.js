import connectMongodb from "@/lib/mongodb"; // MongoDB connection function
import post from "@/models/newPostSchema"; // Mongoose model for 'post'
import { NextResponse } from "next/server";

// POST function to insert data into MongoDB
export async function POST(request) {
  try {
    const {
      caption,
      date,
      image,
      email,
      reactEmail,
      react,
    } = await request.json();  // Destructure the incoming data from the request

    // Validation: Check if the required fields are present
    if (!caption || !date || !image || !email) {
      return NextResponse.json({
        message: "Missing required fields",
        status: false,
        statusCode: 400,  // Bad Request
      });
    }

    // Ensure `reactEmail` is an array (default empty array if not provided)
    const validatedReactEmail = Array.isArray(reactEmail) ? reactEmail : [];

    const data = {
      caption,
      date,
      image,
      email,
      react: react || 0,  // Default to 0 if `react` is not provided
      reactEmail: validatedReactEmail,  // Use the validated array
    };

    // console.log("Post data: ", data);  // Debugging: log the data being sent to MongoDB

    // Connect to MongoDB
    await connectMongodb();

    // Create a new post document in MongoDB
    const createdPost = await post.create(data);

    // Return success response
    return NextResponse.json({
      message: "Data upload success",
      status: true,
      statusCode: 200,
      post: createdPost,  // Return the created post
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({
      message: "Error creating post",
      status: false,
      statusCode: 500,  // Internal Server Error
    });
  }
}
