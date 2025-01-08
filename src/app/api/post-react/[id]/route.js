import connectMongodb from "@/lib/mongodb";
import post from "@/models/newPostSchema";

// Change this to handle a PUT request instead of POST
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    // Get the react value from the request body
    const { react } = await request.json();

    // Validate the react value
    if (react === undefined || react === null || typeof react !== "number") {
      return new Response("Invalid react value", { status: 400 });
    }

    // Connect to MongoDB
    await connectMongodb();

    // Find the post by ID
    const dbReact = await post.findOne({ _id: id }).exec();
    if (!dbReact) {
      return new Response("Post not found", { status: 404 });
    }

    // Update the react count (like count) in the database
    const updatedPost = await post.updateOne(
      { _id: id },
      { $inc: { react: 1 } }  // Increment the react field by 1
    );

    // Return success response with updated count
    return new Response(
      JSON.stringify({ success: true, updatedCount: dbReact.react + 1 }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Server error", { status: 500 });
  }
}
