import connectMongodb from "@/lib/mongodb";
import post from "@/models/newPostSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    caption,
    date,
    image,
    email,
    profile,
    reactEmail,
    react,
  } = await request.json();

  const data = {
    caption,
    date,
    image,
    email,
    profile,
    react,
    // reactEmail,  // The reactEmail here will be an array
  };
  console.log(data)
  // Connect to MongoDB
  await connectMongodb();

  // Create a new post document with the received data
  await post.create(data);

  return NextResponse.json({
    message: "Data upload success",
    status: true,
    statusCode: 200,  // Correcting "status" to "statusCode"
  });
}

export async function GET(request) {
  await connectMongodb();
  const allPost = await post.find({}).catch();

  return NextResponse.json({ allPost });
}

