import connectMongodb from "@/lib/mongodb";
import post from "@/models/newPostSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params
  await connectMongodb();
  const allPost = await post.find({ email: email }).catch();
  return NextResponse.json({ allPost });
}