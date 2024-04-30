import connectMongoDB from "@/libs/mongodb";
// import Topic from "@/models/topic";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { userEmail } = params;
  console.log(userEmail)
  const { purchased: id } = await request.json();
  console.log(id)
  await connectMongoDB();
  const updatedUser = await User.findOneAndUpdate(
    { email: userEmail }, // Query to find the user by email
    { $push: { purchased: id } }, // Push the new id to purchased array
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    // If user is not found, return a 404 error
    return NextResponse.error(new Error("User not found"), { status: 404 });
  }
  
  return NextResponse.json({ message: "Purchased List updated", updatedUser }, { status: 200 });
}

export async function GET(request, { params }) {
  const { userEmail } = params;
  try {
    await connectMongoDB();
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.error(new Error("User not found"), { status: 404 });
    }

    const purchasedIds = user.purchased; // Get the purchased array, or an empty array if it doesn't exist
    // console.log(purchasedIds)
    return NextResponse.json({ purchasedIds }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving purchased list:", error);
    return NextResponse.error(new Error("Failed to retrieve purchased list"), { status: 500 });
  }
}