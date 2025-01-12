import connectMongodb from "@/lib/mongodb";
import comments from "@/models/commentsSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    postId,
    comment,
    commentDate,
    commentEmail,
    displayName,
  } = await request.json();
  const data = {
    postId,
    comment,
    commentDate,
    commentEmail,
    displayName,
  };
  console.log(data)
  await connectMongodb();
  await comments.create(data);
  return NextResponse.json({
    message: "comment submitted",
    status: true,
    status: 200,
  });
}


