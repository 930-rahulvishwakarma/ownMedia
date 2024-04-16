"use client"

import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import { pageTitles } from "@/app/contants";
import { UserProfile } from "@clerk/nextjs";

const MainContainer = ({ children }) => {
  // Get the current url path
  const currentPath = usePathname();

  // const regex = /^\/([^\/]+)/;
  // const firstPath = currentPath.match(regex)
  //   ? currentPath.match(regex)[0]
  //   : currentPath;

    // console.log(firstPath)
    // console.log(currentPath , "current path url without regex");
  // Get title of current path
  const title = pageTitles.find((page) => page.url === currentPath)?.title || "";
  return (
    <section className="flex flex-col flex-1 max-w-3xl 2xl:max-w-5xl px-2 md:px-10 lg:px-4 xl:px-20 ">
      <div className=" " >
      <TopBar />
      </div>
      <div className="mt-6 mb-20">
        <h1 className="mb-5 text-heading2-bold max-sm:text-heading3-bold text-light-1">
          {title}  
        </h1>
        <div className="h-screen overflow-y-scroll custom-scrollbar">
          {children}
        </div>
      </div>
    </section>
  );
};

export default MainContainer;