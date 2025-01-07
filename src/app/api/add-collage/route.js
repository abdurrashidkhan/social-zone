import connectMongodb from "@/lib/mongodb";
import collages from "@/models/collagesSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    collageName,
    collageEstablished,
    description,
    address,
    educationalField,
    date,
    image,
  } = await request.json();
  const data = {
    collageName,
    collageEstablished,
    description,
    address,
    educationalField,
    date,
    image,
  };
  await connectMongodb();
  await collages.create(data);
  return NextResponse.json({
    message: "data upload success",
    status: true,
    status: 200,
  });
}
export async function GET(request) {
  await connectMongodb();
  const allCollage = await collages.find({}).catch();
  // console.log(allUser)
  return NextResponse.json({ allCollage });
}
