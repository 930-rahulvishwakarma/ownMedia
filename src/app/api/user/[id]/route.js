import User from "@/lib/models/user";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { NextResponse } from "next/server";
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const user = await User.findOne({ clerkId: params.id })
      .populate("followers following")
      .exec();
    return NextResponse.json({
      status: 200,
      message: "Success",
      data:user
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
        status: 502,
        message: "SOMETHING WENT WRONG ON FETCHING USER DATA",
      });
  }
};
