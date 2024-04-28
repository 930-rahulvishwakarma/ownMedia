import Post from "@/lib/models/post";
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
      creator: data.get("creatorId"),
      caption: data.get("caption"),
      tag: data.get("tag"),
      postPhoto: postPhoto,
    });
    
    await newPost.save();
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
