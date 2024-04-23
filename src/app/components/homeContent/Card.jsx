"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";
import { MdBookmarks, MdOutlineBookmarks } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaRegCommentDots } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

function Card({ data }) {
  const [islike, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [commentPopup, setCommentPopup] = useState(false);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(inputValue);
      // Call your function here
      console.log("Enter key pressed");
      // You can also pass the inputValue to your function if needed
      // myFunction(inputValue);
    }
  };

  function closeComments() {
    setCommentPopup(false);
  }

  return (
    <section className="">
      <div className="w-full py-4  bg-black h-min  ">
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
                {data?.creatorId?.firstName +
                  "  " +
                  data?.creatorId?.lastName || "username"}
              </p>
              <p className="text-subtle-medium text-light-3 ">
                {" "}
                @{data?.creatorId?.userName || "username"}{" "}
              </p>
            </span>
          </div>
          <div>
            {/* {edit ? (
            <CiEdit className="text-[1.2rem] font-bold cursor-pointer " />
          ) : (
            " "
          )} */}
          </div>
        </div>

        <p className=" w-[95%] mr-auto ml-auto mb-1 text-white capitalize ">
          {" "}
          {data?.caption || "Caption"}{" "}
        </p>

        <div
          style={{
            backgroundImage: `url(${data?.postPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex justify-center h-[400px] relative rounded-md "
        >
          {/* <Image
            src={data?.postPhoto}
            alt="post photo"
            width={200}
            height={150}
            className="rounded-lg w-[100%] h-[400px] object-cover absolute top-0 left-0  "
            unoptimized
          /> */}

          <div className="flex flex-col justify-around absolute right-0 bottom-[10%]  mt-1  h-[8rem] w-[4rem]">
            <div className="flex">
              {islike ? (
                <IoIosHeartEmpty
                  size={24}
                  className="text-white ml-2 cursor-pointer "
                  onClick={() => setLike(false)}
                />
              ) : (
                <IoMdHeart
                  size={24}
                  className=" ml-2 text-red-500 cursor-pointer "
                  onClick={() => setLike(true)}
                />
              )}
              <p className="text-white ml-2 text-base-semibold max-sm:text-small-normal ">
                20
              </p>
            </div>

            <div onClick={() => setCommentPopup(true)} className="flex ">
              <FaRegCommentDots
                size={24}
                className="text-white ml-2 cursor-pointer"
              />
              <p className="text-white ml-2 text-base-semibold max-sm:text-small-normal ">
                20
              </p>
            </div>

            {saved ? (
              <MdBookmarks
                size={24}
                className="text-white ml-2 cursor-pointer "
                onClick={() => setSaved(false)}
              />
            ) : (
              <MdOutlineBookmarks
                size={24}
                className="text-white ml-2 cursor-pointer "
                onClick={() => setSaved(true)}
              />
            )}
          </div>
        </div>

        <div
          className="w-[95%] mr-auto
      ml-auto text-base-semibold text-purple-500 max-sm:text-small-normal "
        >
          {data?.tag || "#tag"}
        </div>
      </div>

      {commentPopup && (
        <div className="w-full fixed top-0 left-0 min-h-dvh z-[21]  ">
          <Comments onClose={closeComments} />
        </div>
      )}
    </section>
  );
}

export default Card;

function Comments({ onClose }) {
  const[showIcon,setIcon] = useState("");
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="h-[65%] absolute w-full bottom-0 bg-[#1d1928] "
    >
      <div className=" mr-auto ml-auto mt-2 w-[50px] h-[5px] bg-[#ffffffda] rounded-full ">
        {" "}
      </div>
      <div className="flex items-center justify-between px-2 ">
        <p className="text-center font-[500] text-white ">Comments (20) </p>
        <RxCross2
          className="text-white font-bold"
          size={20}
          onClick={onClose}
        />
      </div>

      <div className="h-[80%] overflow-y-scroll pb-[4rem] flex  flex-col items-center ">
        <div className=" w-[98%] h-min mt-4 ">
          <div className="flex  ">
            <div className="mt-[.15rem] ">
              <Image
                src={"/assets/phucmai.png"}
                alt="user profile"
                width={45}
                height={25}
                className="rounded-full  "
              />
            </div>
            <div className="leading-5 ">
              <p className="ml-2 text-ellipsis line-clamp-1 text-[#ffffffee] ">
                username
              </p>
              <p className="ml-2 break-words text-[#ffffffee] ">
                comments fsioflk sfnkspjflks fnspfjlksfop lkksfnpsjfl{" "}
              </p>
            </div>
          </div>

          <div className="flex  ">
            <div className="mt-[.15rem] ">
              <Image
                src={"/assets/phucmai.png"}
                alt="user profile"
                width={45}
                height={25}
                className="rounded-full  "
              />
            </div>
            <div className="leading-5 ">
              <p className="ml-2 text-ellipsis line-clamp-1 text-[#ffffffee] ">
                username
              </p>
              <p className="ml-2 break-words text-[#ffffffee] ">
                comments fsioflk sfnkspjflks fnspfjlksfop lkksfnpsjfl{" "}
              </p>
            </div>
          </div>

          <div className="flex  ">
            <div className="mt-[.15rem] ">
              <Image
                src={"/assets/phucmai.png"}
                alt="user profile"
                width={45}
                height={25}
                className="rounded-full  "
              />
            </div>
            <div className="leading-5 ">
              <p className="ml-2 text-ellipsis line-clamp-1 text-[#ffffffee] ">
                username
              </p>
              <p className="ml-2 break-words text-[#ffffffee] ">
                comments fsioflk sfnkspjflks fnspfjlksfop lkksfnpsjfl{" "}
              </p>
            </div>
          </div>

          <div className="flex  ">
            <div className="mt-[.15rem] ">
              <Image
                src={"/assets/phucmai.png"}
                alt="user profile"
                width={45}
                height={25}
                className="rounded-full  "
              />
            </div>
            <div className="leading-5 ">
              <p className="ml-2 text-ellipsis line-clamp-1 text-[#ffffffee] ">
                username
              </p>
              <p className="ml-2 break-words text-[#ffffffee] ">
                comments fsioflk sfnkspjflks fnspfjlksfop lkksfnpsjfl{" "}
              </p>
            </div>
          </div>

          <div className="flex  ">
            <div className="mt-[.15rem] ">
              <Image
                src={"/assets/phucmai.png"}
                alt="user profile"
                width={45}
                height={25}
                className="rounded-full  "
              />
            </div>
            <div className="leading-5 ">
              <p className="ml-2 text-ellipsis line-clamp-1 text-[#ffffffee] ">
                username
              </p>
              <p className="ml-2 break-words text-[#ffffffee] ">
                comments fsioflk sfnkspjflks fnspfjlksfop lkksfnpsjfl{" "}
              </p>
            </div>
          </div>

          <div className="flex  ">
            <div className="mt-[.15rem] ">
              <Image
                src={"/assets/phucmai.png"}
                alt="user profile"
                width={45}
                height={25}
                className="rounded-full  "
              />
            </div>
            <div className="leading-5 ">
              <p className="ml-2 text-ellipsis line-clamp-1 text-[#ffffffee] ">
                username
              </p>
              <p className="ml-2 break-words text-[#ffffffee] ">
                comments fsioflk sfnkspjflks fnspfjlksfop lkksfnpsjfl{" "}
              </p>
            </div>
          </div>

          <div className="flex  ">
            <div className="mt-[.15rem] ">
              <Image
                src={"/assets/phucmai.png"}
                alt="user profile"
                width={45}
                height={25}
                className="rounded-full  "
              />
            </div>
            <div className="leading-5 ">
              <p className="ml-2 text-ellipsis line-clamp-1 text-[#ffffffee] ">
                username
              </p>
              <p className="ml-2 break-words text-[#ffffffee] ">
                comments fsioflk sfnkspjflks fnspfjlksfop lkksfnpsjfl{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between px-2 " >
        <input type="text" placeholder="Comments" className="w-full outline-none bg-transparent ml-2 text-[white] " value={showIcon} onChange={(e)=>setIcon(e.target.value)} />
        {showIcon !== '' &&
          <FiSend className="text-white" size={24} />
        }
      </div>
    </motion.div>
  );
}
