"use client"
import React , { useState } from "react";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import { IoMdHeart , IoIosHeartEmpty } from "react-icons/io";
import { MdBookmarks , MdOutlineBookmarks } from "react-icons/md";

function Card({ data }) {
  const [islike,setLike] = useState(false);  
  const [saved,setSaved] = useState(false);
  return (
    <div className="w-full py-4  bg-black h-min ">
      <div className="flex justify-between items-center text-white w-[95%] ">
        <div className="flex items-center cursor-pointer  ">
          <span>
            <Image
              src={"svg/user.svg"}
              alt="profile photo"
              width={30}
              height={30}
              className="rounded-full  h-[50px] w-[40px] "
            />
          </span>
          <span>
            <p className="text-small-semibold text-light-1">
              {data?.creatorId?.firstName + "" + data?.creatorId?.lastName ||
                "username"}
            </p>
            <p className="text-subtle-medium text-light-3 ">
              {" "}
              @{data?.creatorId?.userName || "username"}{" "}
            </p>
          </span>
        </div>
        <div>
          <CiEdit className="text-[1.2rem] font-bold cursor-pointer " />
        </div>
      </div>
      <p className=" w-[95%] mr-auto ml-auto mb-1 text-white capitalize ">
        {" "}
        {data?.caption || "Caption"}{" "}
      </p>
      <div className="flex justify-center p-4 ">
        <Image
          src={data?.postPhoto}
          alt="post photo"
          width={200}
          height={150}
          className="rounded-lg "
          unoptimized
        />
      </div>
      <div
        className="w-[95%] mr-auto
      ml-auto text-base-semibold text-purple-500 max-sm:text-small-normal "
      >
        {data?.tag || "#tag"}
      </div>

      <div className="flex items-center mt-1 justify-between mr-2">
        <div className="flex" >
          {
            islike ?(
                <IoIosHeartEmpty size={24} className="text-white ml-2 cursor-pointer " onClick={()=>setLike(false)} />
            ):(
                <IoMdHeart size={24} className=" ml-2 text-red-500 cursor-pointer " onClick={()=>setLike(true)} />
            )
          }
          <p className="text-white ml-2 text-base-semibold max-sm:text-small-normal ">
            like count
          </p>
        </div>
        {
            saved ?(
                <MdBookmarks size={24} className="text-white ml-2 cursor-pointer " onClick={()=>setSaved(false)} />
            ):(
                <MdOutlineBookmarks size={24} className="text-white ml-2 cursor-pointer " onClick={()=>setSaved(true)} />
            )
        }
      </div>
    </div>
  );
}

export default Card;
