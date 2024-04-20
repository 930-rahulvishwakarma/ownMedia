import Post from "@/lib/models/post";
import { connectToDB } from "@/lib/mongodb/mongoose";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";

export const POST = async (req) => {


  try {
    await connectToDB();
    const data = await req.formData();

    let postPhoto = data.get("postPhoto");
    if (postPhoto) {

      if (postPhoto instanceof Blob) {
      const bytes = await postPhoto.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = `./public/uploads/${postPhoto.name}`
      

      await writeFile(path, buffer)
      postPhoto = `/uploads/${postPhoto.name}`
  
      const newPost = await Post.create({
        creatorId: data.get("creatorId"),
        username:data.get("username"),
        caption: data.get("caption"),
        tag: data.get("tag"),
        postPhoto: postPhoto
      })

      await newPost.save();
  
      return NextResponse.json({
        status: 200,
        message: "successfully uoloaded",
      });
      } else {
        console.error("postPhoto is not a Blob object");
        return NextResponse.json({
          status: 200,
          message: "Something went wrong",
        });
      }
    } else {
      return NextResponse.json({
        status: 404,
        message: "file is missing",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
};
