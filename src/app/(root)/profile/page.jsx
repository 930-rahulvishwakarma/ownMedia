"use client"
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react';
import { PersonAddAlt, PersonRemove } from "@mui/icons-material";
import ProfilePostCard from '@/app/components/ProfilePostCard';
import { useUser } from "@clerk/nextjs";



function Profile() {
    const [userData, setUserData] = useState({});
    const { user, isLoaded } = useUser();
    const [card,setCard] = useState([]);

    const getUser = async () => {
        let res = await fetch(`/api/profile/${user.id}`);
        res = await res.json();
        if (res?.status === 200) {
            setUserData(res?.data);
            setCard(res?.data?.posts)
        }
    };

    useEffect(() => {
        if (user) {
            getUser();
        }
    }, [user]);


    return (
        <section className='pb-[8rem]'>
            <div className=' h-[17vh] flex justify-between  px-2 py-0.5 '>
                <div className='flex items-center w-[70%]  ' >
                    <div className='h-full grid place-items-center ' >
                        <Image
                            src={userData?.profilePhoto}
                            alt="profile photo"
                            width={50}
                            height={50}
                            className="rounded-full object-cover h-[80%] w-[100%] "
                        />
                    </div>
                    <div className='flex flex-col justify-between h-[90%] w-[80%] '>
                        <h1 className='ml-2 text-light-1 text-heading4-bold max-sm:text-heading4-bold line-clamp-1 '> {userData?.firstName} {userData?.lastName || "user"} </h1>
                        <h2 className='ml-2 text-light-3 text-subtle-semibold '>@ {userData?.userName || "username"} </h2>
                        <div className="ml-2 flex gap-7 text-small-bold max-sm:gap-4">
                            <div className="flex  gap-2 items-center max-sm:gap-0.5">
                                {/* <p className="text-purple-1"> {userData?.posts || 0 } </p> */}
                                <p className="text-light-1">Posts</p>
                            </div>
                            <div className="flex  gap-2 items-center max-sm:gap-0.5">
                                {/* <p className="text-purple-1">{userData?.followers.length || 0}</p> */}
                                <p className="text-light-1">Followers</p>
                            </div>
                            <div className="flex  gap-2 items-center max-sm:gap-0.5">
                                {/* <p className="text-purple-1">{userData?.following.length || 0}</p> */}
                                <p className="text-light-1">Following</p>
                            </div>
                        </div>
                    </div>

                </div>
                <h1>
                    <PersonAddAlt
                        sx={{ color: "#7857FF", cursor: "pointer", fontSize: "40px" }}
                    />
                </h1>
            </div>
            <div className='flex w-[55%] max-md:w-[80%] justify-around items-center mt-2 ' >
                <div className=' text-white text-[.8rem] px-3 py-2 rounded-md bg-purple-700 font-semibold '>
                    posts
                </div>
                <div className=' text-white text-[.8rem] px-3 py-2 rounded-md bg-[#ffffff1c] font-semibold '>
                    Followers
                </div>
                <div className=' text-white text-[.8rem] px-3 py-2 rounded-md bg-[#ffffff1c] font-semibold '>
                    Following
                </div>
            </div>
            <div className='mt-2 grid grid-cols-3 grid-rows-1 justify-items-center gap-2  ' >
                {card.map((item , i)=>(
                    <ProfilePostCard key={i} content = {item} />
                ))}
            </div>
        </section>
    )
}

export default Profile