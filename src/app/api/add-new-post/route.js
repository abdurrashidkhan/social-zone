import connectMongodb from "@/lib/mongodb";
import post from "@/models/newPostSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    caption,
    date,
    image,
    profile
  } = await request.json();
  const data = {
    caption,
    date,
    image,
    profile
  };
  await connectMongodb();
  await post.create(data);
  return NextResponse.json({
    message: "data upload success",
    status: true,
    status: 200,
  });
}
export async function GET(request) {
  await connectMongodb();
  const allPost = await post.find({}).catch();
  // console.log(allUser)
  return NextResponse.json({ allPost });
}
