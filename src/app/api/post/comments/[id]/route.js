import connectMongodb from "@/lib/mongodb";
import comments from "@/models/commentsSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // Connect to MongoDB
    await connectMongodb();

    // Extract `id` from params
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    console.log("Requested Post ID:", id);

    // Query comments based on `postId`
    const query = { postId: id };

    const allComments = await comments.find(query).exec();

    if (!allComments || allComments.length === 0) {
      return NextResponse.json(
        { comments: [], message: "No Comments Found" },
        { status: 200 }
      );
    }

    return NextResponse.json({ comments: allComments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching comments" },
      { status: 500 }
    );
  }
}
