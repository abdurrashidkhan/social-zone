import connectMongodb from "@/lib/mongodb";
import post from "@/models/newPostSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params
  // console.log(email)
  await connectMongodb();
  const allPost = await post.findOne({ email: email }).catch();
  // console.log(allPost)
  return NextResponse.json({ allPost });
}