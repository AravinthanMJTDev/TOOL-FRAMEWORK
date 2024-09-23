"use client";
import { ReactElement, useState } from "react";
import Navigation from "../content/Navigation/navigation";
import Header from "../header/header";

const Main = ({ children }: { children: ReactElement }) => {
  const [naviOpen, setNaviOpen] = useState(false);
  return (
    <div className="flex flex-col flex-grow w-[100%] md:w-[1/2] min-h-screen mx-auto bg-slate-50 font-lato mb-10">
      <Header />
      <div className="w-full gap-2 flex flex-row flex-grow mt-4 text-wrap h-[80%]">
        <div className="hidden sm:flex w-[20%]  flex-col items-center bg-zinc-300">
          <Navigation className="space-y-4 mt-10 mx-auto" />
        </div>
        {/* BACKGROUND COLOR IN STYLE.CSS */}
        <div className="w-full contentBg flex rounded-t-lg  ">{children}</div>

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
    </div>
  );
};
export default Main;
