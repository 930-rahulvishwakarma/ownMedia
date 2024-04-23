"use client";
import { useUser } from "@clerk/nextjs";
import Card from "../components/homeContent/Card";
import { useEffect, useState } from "react";

export default function Home() {
  const [post, setPost] = useState([]);
  const [userData, setUserData] = useState({});

  const { user } = useUser();

  async function getPostdata() {
    let res = await fetch("api/post");
    res = await res.json();
    setPost(res?.data);
  }

  const getUser = async () => {
    let res = await fetch(`/api/user/${user.id}`);
    res = await res.json();
    if (res?.status === 200) {
      setUserData(res?.data);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  useEffect(() => {
    getPostdata();
  }, []);

  return (
    <div className="flex flex-col-reverse gap-10">
      {post && post.length > 0 ? (
        post.map((item, i) => (
          <Card key={item._id} data={item} user={userData?.userName} />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
