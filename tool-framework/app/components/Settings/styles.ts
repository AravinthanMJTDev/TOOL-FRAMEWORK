export const styles = {
  container: [
    "sm:w-full h-full flex flex-col space-y-3 bg-[#f3f6f4] p-5 rounded-lg",
  ],
  subTopContainer: [
    "w-full flex justify-between items-center bg-[#d4d4d4] p-3 rounded-t-lg",
  ],
  tabs: ["flex space-x-10 "],
  tabname: [
    "relative cursor-pointer inline-block",
    "before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-0 before:h-[2px] before:bg-blue-700 before:scale-x-0 before:transition-transform before:duration-700 before:origin-left hover:before:scale-x-100",
  ],
  ActionButtonsContainer: ["w-full flex space-x-3 bg-[#d4d4d4] rounded-lg p-3"],
  TableContainer: ["w-full"],
  Button: [
    "text-black py-3 rounded-md hover:bg-slate-400 transition-all bg-[#b4b4b4]",
  ],
};
