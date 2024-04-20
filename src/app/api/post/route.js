import Post from "@/lib/models/post";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectToDB();
    const userposts = await Post.find()
      .populate("likes creatorId")
      .exec();

    return NextResponse.json({
      status: 200,
      message: "successfully fetched",
      data: userposts,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
      error:error
    });
  }
};
