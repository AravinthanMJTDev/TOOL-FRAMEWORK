import Main from "../Layout/Main";
import OtherContent from "./otherContent/otherContent";
import Status from "./status/status";
import { HighChart } from "../content/Graph/HighCharts/page";

const Page = () => {
  return (
    <Main>
      <div className="w-full flex flex-col h-[100%] ">
        <div className="w-full h-[20%] flex flex-col gap-2 sm:flex-row sm:space-x-2 m-5 ">
          <Status />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 m-5">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 flex-wrap">
            <div className="min-h-[40%] w-full p-5 contentBg rounded-lg boxShadow">
              <HighChart />
            </div>
            <div className="min-h-[40%] w-full p-5 contentBg rounded-lg boxShadow">
              <HighChart />
            </div>
            <div className="min-h-[40%] w-full p-5 contentBg rounded-lg boxShadow">
              <HighChart />
            </div>
            <div className="min-h-[40%] w-full p-5 contentBg rounded-lg boxShadow">
              <HighChart />
            </div>
          </div>

          <div className="w-full sm:w-[20%] flex flex-col h-[100%] m-5 gap-3">
            <OtherContent />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Page;
