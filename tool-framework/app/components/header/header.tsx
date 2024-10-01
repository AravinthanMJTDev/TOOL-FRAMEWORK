import Image from "next/image";
const Header = () => {
  return (
    <div className=" w-full h-16 sm:h-20  gap-2 flex flex-row  text-xl mt-5">
      <div className="w-[20%] header flex flex-row justify-center items-center">
        <Image
          src="https://mjtechsolutions.in/images/logo.jpg"
          alt="person"
          width={500}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="w-[80%]  header flex flex-row justify-center items-center">
        TOOL FRAMEWORK
      </div>
    </div>
  );
};
export default Header;
