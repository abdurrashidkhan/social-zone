import connectMongodb from "@/lib/mongodb";
import post from "@/models/newPostSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

  await connectMongodb();
  const allPost = await post.find().catch();
  console.log(allPost)
  return NextResponse.json({ allPost });

}