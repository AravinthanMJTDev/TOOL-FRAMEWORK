"use client";
import Main from "../Layout/Main";
import { NextUIProvider } from "@nextui-org/react";
import TicketDashboard from "./TicketDashboard/page";
import "../styles.css";
import { items } from "./TicketDashboard/Data";
import type { TableProps } from "antd";
import { useState } from "react";
import { TicketDashboardProps } from "./TicketDashboard/types";
type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition<T extends object> = NonNullable<
  TablePagination<T>["position"]
>[number];

const Page = () => {
  const topOptions = [
    { label: "topLeft", value: "topLeft" },
    { label: "topCenter", value: "topCenter" },
    { label: "topRight", value: "topRight" },
    { label: "none", value: "none" },
  ];

  const bottomOptions = [
    { label: "bottomLeft", value: "bottomLeft" },
    { label: "bottomCenter", value: "bottomCenter" },
    { label: "bottomRight", value: "bottomRight" },
    { label: "none", value: "none" },
  ];

  const [top, setTop] =
    useState<TablePaginationPosition<TicketDashboardProps>>("topLeft");
  const [bottom, setBottom] =
    useState<TablePaginationPosition<TicketDashboardProps>>("bottomRight");
  return (
    <Main>
      <div className="w-3/4  m-auto p-5 rounded-lg light bg-background">
        <NextUIProvider>
          <TicketDashboard<TicketDashboardProps>
            items={items}
            pagination={{ position: [top, bottom] }}
          ></TicketDashboard>
        </NextUIProvider>
      </div>
    </Main>
  );
};
export default Page;
