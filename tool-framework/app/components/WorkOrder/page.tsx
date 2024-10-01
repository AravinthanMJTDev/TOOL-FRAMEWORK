import Main from "../Layout/Main";
import { NextUIProvider } from "@nextui-org/react";
import TicketDashboard from "./TicketDashboard/page";
import "../styles.css";
const Page = () => {
  return (
    <Main>
      <div className="w-full p-5 rounded-lg light bg-background">
        <NextUIProvider>
          <TicketDashboard></TicketDashboard>
        </NextUIProvider>
      </div>
    </Main>
  );
};
export default Page;
