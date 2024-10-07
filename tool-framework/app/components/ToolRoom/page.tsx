"use client";
import Main from "../Layout/Main";
import { NextUIProvider } from "@nextui-org/react";

// import "../styles.css";
import "./styles.css";

import { useEffect, useState } from "react";
import {
  columnsForToolRoomWorkOrder,
  dataForToolRoomWorkOrder,
} from "../Data/ToolWorkOrderData/page";
import TableForWO from "./Table/page";
import BreadCrumbs from "../Breadcrumbs/page";

const Page = () => {
  const [dataFromDB, setDataFromDB] = useState([]);
  const [columnsFromDB, setColumnsFromDB] = useState([]);
  console.log("data", dataFromDB);
  useEffect(() => {
    setDataFromDB(dataForToolRoomWorkOrder);
    setColumnsFromDB(columnsForToolRoomWorkOrder);
  }, [dataForToolRoomWorkOrder, columnsForToolRoomWorkOrder]);
  function changeTable(value: string) {
    switch (value) {
      // case "new": {
      //   const filteredData = dataForToolRoomWorkOrder.filter(
      //     (data) => data.status === "new"
      //   );
      //   console.log(filteredData);
      //   setDataFromDB(filteredData);
      //   break;
      // }
      case "part yet to be recieved": {
        const filteredData = dataForToolRoomWorkOrder.filter(
          (data) => data.status === "part yet to be recieved"
        );
        console.log(filteredData);
        setDataFromDB(filteredData);
        break;
      }
      case "part recieved": {
        const filteredData = dataForToolRoomWorkOrder.filter(
          (data) => data.status === "part recieved"
        );
        console.log(filteredData);
        setDataFromDB(filteredData);
        break;
      }
      case "quality approval": {
        const filteredData = dataForToolRoomWorkOrder.filter(
          (data) => data.status === "quality approval"
        );
        console.log(filteredData);
        setDataFromDB(filteredData);
        break;
      }
      case "work ongoing": {
        const filteredData = dataForToolRoomWorkOrder.filter(
          (data) => data.status === "work ongoing"
        );
        console.log(filteredData);
        setDataFromDB(filteredData);
        break;
      }
      default: {
        setDataFromDB(dataForToolRoomWorkOrder);
      }
    }
  }
  return (
    <Main>
      <div className="w-full p-5 rounded-lg bg-background space-y-5">
        {/* <div className="w-full p-4 bg-slate-300 shadow-md mb-4 rounded-lg"> */}

        {/* <ul className="flex flex-row ">
          <li
            className="min-w-34 h-24  flex-1 "
            onClick={() => changeTable("new")}
          >
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              New
            </BreadCrumbs>
          </li>

          <li
            className="min-w-34 h-24 -ml-6  flex-1"
            onClick={() => changeTable("part yet to be recieved")}
          >
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Part yet to be Received
            </BreadCrumbs>
          </li>
          <li
            className="min-w-34 h-24 -ml-6 flex-1"
            onClick={() => changeTable("part recieved")}
          >
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Part Recieved
            </BreadCrumbs>
          </li>
          <li
            className="min-w-34 h-24 -ml-6 flex-1"
            onClick={() => changeTable("work ongoing")}
          >
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Work OnGoing{" "}
            </BreadCrumbs>
          </li>
          <li
            className="min-w-34 h-24 -ml-6 flex-1"
            onClick={() => changeTable("quality approval")}
          >
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Quality Approval{" "}
            </BreadCrumbs>
          </li>
          <li className="min-w-34 h-24 -ml-6 flex-1">
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Production Approval{" "}
            </BreadCrumbs>
          </li>
          <li className="min-w-34 h-24 -ml-6 flex-1">
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Tool Completion Report{" "}
            </BreadCrumbs>
          </li>
          <li className="min-w-34 h-24 -ml-6 flex-1">
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Tool ready to be Delivered{" "}
            </BreadCrumbs>
          </li>
          <li className="min-w-34 h-24 -ml-6 flex-1">
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Tool delivered{" "}
            </BreadCrumbs>
          </li>
          <li className="min-w-34 h-24 -ml-6 flex-1">
            <BreadCrumbs
              fill="387ADF"
              hoverFill="#F4EA8E"
              stroke="#F4EA8E"
              hoverStroke="387ADF"
              text="black"
            >
              Tool report{" "}
            </BreadCrumbs>
          </li>
        </ul> */}
        {/* </div> */}

        <ul className="breadcrumb">
          <li onClick={() => changeTable("new")}> New</li>
          <li onClick={() => changeTable("part recieved")}> Part Recieved</li>
          <li onClick={() => changeTable("part yet to be recieved")}>
            {" "}
            Part yet to be Received
          </li>
          <li onClick={() => changeTable("work ongoing")}> Work OnGoing</li>

          <li onClick={() => changeTable("quality approval")}>
            {" "}
            Quality Approval
          </li>
          <li> Production Approval</li>
          <li> Tool Completion Report</li>
          <li> Tool to be Delivered</li>
          <li>delivered</li>
          <li>report</li>
        </ul>
        <NextUIProvider>
          {dataFromDB.length && columnsFromDB.length && (
            <TableForWO data={dataFromDB} columns={columnsFromDB} />
          )}
        </NextUIProvider>
      </div>
    </Main>
  );
};

export default Page;
