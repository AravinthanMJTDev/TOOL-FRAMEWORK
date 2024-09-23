"use client";
import { useState } from "react";
import ContentArea from "../DashBoard/page";
import Navigation from "./Navigation/navigation";

const Content = () => {
  const [naviOpen, setNaviOpen] = useState(false);
  return (
    <div className="w-full gap-2 flex flex-row flex-grow mt-4 text-wrap">
      <div className="hidden sm:flex w-[20%] h-[80%] flex-col items-center bg-zinc-300">
        <Navigation className="space-y-4 mt-10 mx-auto" />
      </div>
      <div className="w-full  bg-neutral-200 rounded-t-lg flex flex-grow ">
        <ContentArea />
      </div>

      {/* FLOATING BUTTON */}
      <div className="w-[90%] fixed bottom-5 left-1/2 transform -translate-x-1/2 sm:hidden">
        <div className="flex flex-row justify-center bg-slate-100 rounded-xl z-20">
          <div
            className="w-10 h-5 bg-black"
            onClick={() => {
              setNaviOpen(!naviOpen);
            }}
          ></div>
        </div>
        {naviOpen && <Navigation className="space-y-4 blocks z-50" />}
      </div>
    </div>
  );
};
export default Content;
