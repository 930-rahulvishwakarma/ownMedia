import Post from "@/lib/models/post";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { query } = params;
    try {
        await connectToDB();
        const searchPost = await Post.find({
            $or: [
                { caption: { $regex: query, $options: "i" } },
                { tag: { $regex: query, $options: "i" } }
            ]
        }).populate("creatorId likes comments username").exec();
        return NextResponse.json({
            status: 200,
            message: "successfully searched",
            data: searchPost,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 200,
            message: "successfully searched",
            data: error,
        });
    }
}