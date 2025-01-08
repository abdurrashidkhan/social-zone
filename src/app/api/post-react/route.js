import connectMongodb from "@/lib/mongodb";
import users from "@/models/usersSchema";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const {
    react,
  } = await request.json();
  const data = {
    react,
  };
  await connectMongodb();
  await users.create(data);
  return NextResponse.json({
    message: "data upload success",
    status: true,
    status: 200,
  });
}

