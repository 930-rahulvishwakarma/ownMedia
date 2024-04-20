"use client";
import { useUser } from "@clerk/nextjs";
import Card from "../components/homeContent/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const [post, setPost] = useState([]);

  async function getPostdata() {
    let res = await fetch("api/post");
    res = await res.json();
    setPost(res?.data);
  }

  console.log(post);

  useEffect(() => {
    getPostdata();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      {post && post.length > 0 ? (
        post.map((item, i) => 
        <Card
         key={item._id}
         data={item}
         />)
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
