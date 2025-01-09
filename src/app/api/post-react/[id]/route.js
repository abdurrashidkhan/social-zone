import connectMongodb from "@/lib/mongodb";
import post from "@/models/newPostSchema";

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    // Get the email value from the request body
    const { email } = await request.json();
    // console.log(email)
    // Validate the email value
    if (!email || typeof email !== "string") {
      return new Response("Invalid email value", { status: 400 });
    }

    // Connect to MongoDB
    await connectMongodb();

    // Find the post by ID
    const dbPost = await post.findOne({ _id: id }).exec();
    if (!dbPost) {
      return new Response("Post not found", { status: 404 });
    }

    // Update the react count (like count) and add the email to the reactEmail array
    const updatedPost = await post.updateOne(
      { _id: id },
      {
        $inc: { react: 1 }, // Increment the react count by 1
        $addToSet: {
          reactEmail: {
            email: email, // Add the email
            timestamp: new Date(), // Add the timestamp of when the user reacted
          },
        },
      }
    );

    // Return success response with updated count
    return new Response(
      JSON.stringify({
        success: true,
        updatedCount: dbPost.react + 1, // Updated react count after increment
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Server error", { status: 500 });
  }
}
