"use client";
import { UsersData } from "@/app/UsersData/page";
import Main from "../Layout/Main";
import Image from "next/image";
import classNames from "classnames";
import { styles } from "./styles";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
const Profile = () => {
  const [userDataFromDB, setUserDataFromDB] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setUserDataFromDB(UsersData);
  }, [UsersData]);
  const handlePasswordChange = (e) => {
    const { id, value } = e;
    setUserDataFromDB((prev) => ({ ...prev, [id]: value }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Main>
      <div className={classNames(styles.Container)}>
        <div className={classNames(styles.photoContainer)}>
          <Image
            src={userDataFromDB?.profile}
            alt="profile"
            width={500}
            height={100}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "inherit",
            }}
            priority={true}
          ></Image>
        </div>
        <div className="w-full flex flex-col ">
          <Chip
            className="text-center font-semibold text-2xl text-slate-600 mx-auto my-3 p-3 boxShadow"
            variant="flat"
            color="default"
          >
            {UsersData.name}
          </Chip>

          <div className="flex justify-around border border-gray-500 rounded-lg mx-3 p-3 mb-3">
            <label className="w-1/2 text-xl  text-slate-600">Password</label>
            <div className="flex items-center w-1/2 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={userDataFromDB?.password}
                onChange={(e) => handlePasswordChange(e)}
                className=" text-base text-gray-600 bg-transparent border-0 outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-around border border-gray-500 rounded-lg mx-3 p-3 mb-3">
            <div className="w-1/2 text-xl  text-slate-600">Email</div>
            <div className="flex items-center w-1/2">
              <p className="text-slate-600 text-lg">{userDataFromDB?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Profile;
