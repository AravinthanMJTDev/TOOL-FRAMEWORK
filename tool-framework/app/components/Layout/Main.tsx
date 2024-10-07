"use client";
import { ReactElement, useState } from "react";
import Navigation from "../content/Navigation/navigation";
import Header from "../header/header";

const Main = ({ children }: { children: ReactElement }) => {
  const [naviOpen, setNaviOpen] = useState(false);
  return (
    <div className="main  flex flex-col  h-[100%] w-[100%] md:w-[1/2] mx-auto  m-10">
      <Header />
      <div className="w-full gap-2 flex flex-row  mt-4 text-wrap h-[80%]">
        <div className="navigation boxShadow hidden sm:flex w-[20%] h-[100%] flex-col items-center ">
          <Navigation className="w-full    h-[100%] " />
        </div>
        {/* BACKGROUND COLOR IN STYLE.CSS */}
        <div className="w-full sm:w-[80%] contentBg boxShadow flex  rounded-t-lg sm:p-10 overflow-auto">
          {children}
        </div>

        {/* FLOATING BUTTON */}
        <div className="fixed top-10 right-0 sm:hidden ">
          <div className="z-50 ">
            <div
              className={` w-10 h-10 flex items-center justify-center rounded-full bg-black text-white cursor-pointer transition-transform duration-300 ${
                naviOpen ? "rotate-45" : ""
              }`}
              onClick={() => {
                setNaviOpen(!naviOpen);
              }}
            >
              {/* Toggle Icon (e.g., +/x or hamburger menu) */}
              <span className="text-2xl font-bold">+</span>
            </div>
          </div>
          {/* Slide-in Navigation */}
          {naviOpen && (
            <div className=" w-[300px] bg-white rounded-lg p-5 shadow-lg  transition-all duration-500 ">
              <Navigation className="space-y-4 block z-20 navigation overflow-y-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Main;
