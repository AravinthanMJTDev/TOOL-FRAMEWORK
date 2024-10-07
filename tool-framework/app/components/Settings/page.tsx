"use client";

import { useEffect, useState } from "react";
import Main from "../Layout/Main";
import classNames from "classnames";
import { styles } from "./styles";
import TicketDashboard from "./WorkOrderTable/Table/page";
import { PartDataBase, usersDB } from "../Data/SettingsWorkOrderData/page";
import Popup from "./WorkOrderTable/AddUser/page";
import SignIn from "./WorkOrderTable/SignIn/page";
import ReasonForUnload from "./WorkOrderTable/ReasonForUnload/page";
import PartPage from "./WorkOrderTable/Part/page";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [parts, setparts] = useState([]);
  const [activeTab, setActiveTab] = useState("table"); // Use a string for tab management
  // const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setUsers(usersDB);
    setparts(PartDataBase);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // setShowPopup(false);
  };

  return (
    <Main>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.subTopContainer)}>
          <div className={classNames(styles.tabs)}>
            {/* Tabs for navigation */}
            <div className={classNames(styles.tab)}>
              <p
                className={classNames(styles.tabname)}
                onClick={() => handleTabClick("table")}
              >
                User
              </p>
            </div>
            {/* <div className={classNames(styles.tab)}>
              <p
                className={classNames(styles.tabname)}
                onClick={() => setShowPopup(true)}
              >
                User
              </p>
            </div> */}
            <div className={classNames(styles.tab)}>
              <p
                className={classNames(styles.tabname)}
                onClick={() => handleTabClick("part")}
              >
                Part
              </p>
            </div>
            <div className={classNames(styles.tab)}>
              <p
                className={classNames(styles.tabname)}
                onClick={() => handleTabClick("ReasonForUnload")}
              >
                Reason for Unload
              </p>
            </div>
            <div className={classNames(styles.tab)}>
              <p
                className={classNames(styles.tabname)}
                onClick={() => handleTabClick("signin")}
              >
                Sign In
              </p>
            </div>
          </div>
        </div>

        <div className={classNames(styles.TableContainer)}>
          {/* Render components based on activeTab state */}
          {activeTab === "table" && <TicketDashboard usersDB={users} />}
          {activeTab === "part" && <PartPage PartDataBase={parts} />}
          {activeTab === "signin" && <SignIn />}
          {activeTab === "ReasonForUnload" && <ReasonForUnload />}
        </div>

        {/* Conditional rendering for popup */}
        {/* {showPopup && (
          <Popup onClose={() => setShowPopup(false)} setUsers={setUsers} />
        )} */}
      </div>
    </Main>
  );
};

export default Page;
