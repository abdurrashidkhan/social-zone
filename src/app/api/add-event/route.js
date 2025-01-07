import connectMongodb from "@/lib/mongodb";
import events from "@/models/eventsSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    title,
    contentDurations,
    description,
    eventDate,
    collageName,
    date,
    image,
  } = await request.json();
  const data = {
    title,
    contentDurations,
    description,
    eventDate,
    collageName,
    date,
    image,
  };
  await connectMongodb();
  await events.create(data);
  return NextResponse.json({
    message: "data upload success",
    status: true,
    status: 200,
  });
}
export async function GET(request) {
  await connectMongodb();
  const allEvents = await events.find({}).catch();
  // console.log(allUser)
  return NextResponse.json({ allEvents });
}
