import Main from "../Layout/Main";
import OtherContent from "../content/otherContent/otherContent";
import Status from "../content/status/status";
import HighChart from "../content/Graph/HighCharts/page";
import Link from "next/link";
import { StatusData } from "../Data/page";
interface statusProps {
  status: string;
  color: string;
}
const Page = () => {
  const status = StatusData;
  return (
    <Main>
      <div className="w-full flex flex-col h-[100%]">
        <div className="w-full h-[20%] flex flex-col gap-2 sm:flex-row sm:space-x-2 m-5 ">
          {status.map((statusItem: statusProps, index: number) => (
            <Link
              key={index}
              className="w-[90%] h-[100%] sm:w-[15%] sm:min-h-[100px] bg-zinc-300 rounded-lg"
              href={`/components/content/status/${statusItem.status}`}
            >
              <Status status={statusItem.status} bgColor={statusItem.color} />
            </Link>
          ))}
        </div>
        <div className=" flex flex-col  sm:h-[80%] m-5 gap-3 sm:flex-row ">
          <div
            className="w-full flex flex-col justify-between
        sm:flex-row flex-wrap "
          >
            <HighChart />
            <HighChart />
            <HighChart />
            <HighChart />
          </div>
          <div className="w-[20%] flex flex-col h-[100%]  m-5 gap-3 sm:flex-row ">
            <OtherContent />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Page;
