import { connectToDB } from "@/lib/mongodb/mongoose";
import User from "@/lib/models/user";
import Post from "@/lib/models/post";
import { NextResponse } from "next/server";

export const GET = async (req , {params}) =>{
    console.log(params);
   try {
    await connectToDB();
    const user = await User.findOne({clerkId:params.profileId}).populate({
        path:"posts savedposts",
        model:Post,
        populate:{
            path:"creatorId",
            model:User
        }
    }).exec(); 
    return NextResponse.json({
        status:200,
        message:"success",
        data:user
    })
   } catch (error) {
    console.log(error);
    return NextResponse.json({
        status:500,
        message:"fail",
        data:error
    })
   }
}