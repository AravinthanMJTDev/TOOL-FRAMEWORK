"use client";
import { type MenuProps, Dropdown, Menu, Progress } from "antd";
import Image from "next/image";
import { styles } from "./styles";
import { type TicketDashboardProps } from "./types";
import { items } from "./Data";
import classNames from "classnames";
import { ChevronDown } from "lucide-react";
export type User = (typeof items)[0];

const TicketDashboard = ({ items }: { items: TicketDashboardProps[] }) => {
  const menuItems: MenuProps["items"] = [
    { key: 1, label: "Today" },
    { key: 2, label: "Yesterday" },
    { key: 3, label: "Last 7 Days" },
    { key: 4, label: "Last 30 Days" },
    { key: 5, label: "This Month" },
    { key: 6, label: "Last Month" },
  ];
  console.log("use");
  const menu = <Menu items={menuItems} />;

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.subContainer)}>
        <div className={classNames(styles.header)}>
          <div className={classNames(styles.team)}>Team Members</div>
          <div className={classNames(styles.dropBox)}>
            <span className="font-bold">SORT BY:</span>
            <Dropdown overlay={menu} trigger={["click"]}>
              <div
                className={classNames(styles.hover)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                Last 30 Days
                {/* <ImageComponent
                  src="https://img.icons8.com/?size=100&id=39942&format=png&color=878A99"
                  alt="arrow"
                  height={8}
                  width={8}
                  className="ml-2"
                /> */}
                <ChevronDown />
              </div>
            </Dropdown>
          </div>
        </div>
        <div className={classNames(styles.memberBox)}>
          <table className={classNames(styles.table)}>
            <thead>
              <tr className={classNames(styles.headerText)}>
                <th className={classNames(styles.headerValue)}>Member</th>
                <th className={classNames(styles.headerValue)}>Hours</th>
                <th className={classNames(styles.headerValue)}>Tasks</th>
                <th className={classNames(styles.headerValue)}>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className={classNames(styles.tableImageBox)}>
                      <div className={classNames(styles.tableImage)}>
                        {/* <ImageComponent
                          src={item.image}
                          alt="person"
                          height={33}
                          width={33}
                          style={{
                            borderRadius: "5px",
                          }}
                        /> */}
                        <Image
                          src={item.image}
                          alt="person"
                          height={33}
                          width={33}
                          style={{
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <div className={classNames(styles.tableContent)}>
                        <div className={classNames(styles.tableName)}>
                          {item.name}
                        </div>
                        <div className={classNames(styles.tableRow)}>
                          {item.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={classNames(styles.tableHour)}>
                    {item.hour} <span className="text-[#878A99]">: 150h</span>
                  </td>
                  <td className={classNames(styles.tableStatus)}>
                    {item.task}
                  </td>
                  <td>
                    <div className={classNames(styles.tableProgress)}>
                      <Progress
                        type="circle"
                        strokeColor={item.statusColor}
                        percent={item.status}
                        size={25}
                        showInfo={false}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default TicketDashboard;
