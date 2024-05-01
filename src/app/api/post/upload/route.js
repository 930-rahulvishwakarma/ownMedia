import Post from "@/lib/models/post";
import User from "@/lib/models/user";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export const POST = async (req) => {
  const path = require("path");
  const currentWorkingDirectory = process.cwd();
  try {
    await connectToDB();
    const data = await req.formData();
    let postPhoto = data.get("postPhoto");
    const bytes = await postPhoto.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const postPhotoPath = path.join(
      currentWorkingDirectory,
      "public",
      "uploads",
      postPhoto.name
    );

    await writeFile(postPhotoPath, buffer);

    postPhoto = `/uploads/${postPhoto.name}`;

    const newPost = await Post.create({
      creatorId: data.get("creatorId"),
      username: data.get("username"),
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto: postPhoto,
    });
    
    await newPost.save();

    // Update the user's posts array
    await User.findByIdAndUpdate(
      data.get("creatorId"),
      { $push: { posts: newPost._id } },
      { new: true, useFindAndModify: false }
    )

    return NextResponse.json({
      status: 200,
      message: "file uploaded successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: error,
    });
  }
};
