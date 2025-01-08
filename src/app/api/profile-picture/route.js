import connectMongodb from "@/lib/mongodb";
import users from "@/models/usersSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    image,
  } = await request.json();
  const data = {
    image,
  };
  await connectMongodb();
  await users.create(data);
  return NextResponse.json({
    message: "data upload success",
    status: true,
    status: 200,
  });
}

