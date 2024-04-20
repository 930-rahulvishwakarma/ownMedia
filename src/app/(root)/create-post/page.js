"use client";

import React from "react";
import CreatePost from "@/app/components/postContent/CreatePost";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import { useUser } from "@clerk/nextjs";


function Page() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const { user, isLoaded } = useUser();

  const getUser = async () => {
    let res = await fetch(`/api/user/${user.id}`);
    res = await res.json();
    if (res?.status === 200) {
      setUserData(res?.data);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]); 

  const postData ={
    creatorId:userData?._id,
    username:userData?.userName,
    post:null,
    caption:"",
    tag:"",
  }

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div>
      <CreatePost post = {postData} />
    </div>
  );
}

export default Page;
