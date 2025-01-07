import connectMongodb from "@/lib/mongodb";
import admissionInfo from "@/models/admissionInfoSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    firstName,
    middleInitial,
    lastName,
    dateOfBirth,
    gender,
    citizenship,
    phone,
    email,
    city,
    state,
    zipCode,
    emergencyFirstName,
    emergencyLastName,
    relationship,
    emergencyEmail,
    emergencyPhone,
    otherLanguages,
    date,
  } = await request.json();
  const data = {
    firstName,
    middleInitial,
    lastName,
    dateOfBirth,
    gender,
    citizenship,
    phone,
    email,
    city,
    state,
    zipCode,
    emergencyFirstName,
    emergencyLastName,
    relationship,
    emergencyEmail,
    emergencyPhone,
    otherLanguages,
    date,
  };
  await connectMongodb();
  await admissionInfo.create(data);
  return NextResponse.json({
    message: "data upload success",
    status: true,
    status: 200,
  });
}
export async function GET(request) {
  await connectMongodb();
  const alAdmissionInfo = await admissionInfo.find({}).catch();
  // console.log(allUser)
  return NextResponse.json({ alAdmissionInfo });
}
