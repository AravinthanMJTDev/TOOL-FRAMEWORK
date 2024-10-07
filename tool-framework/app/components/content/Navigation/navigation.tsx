import classNames from "classnames";
import Link from "next/link";
import styles from "./styles";

const Navigation = ({ className }: { className: string }) => {
  return (
    <ul id="navigationId" className={className}>
      <Link
        className={classNames(styles.linkContainer)}
        href="/components/DashBoard"
      >
        <li>Dashboard</li>
      </Link>
      <Link
        className={classNames(styles.linkContainer)}
        href="/components/ToolRoom"
      >
        <li>Tool Room</li>
      </Link>
      <Link
        className={classNames(styles.linkContainer)}
        href="/components/WorkOrder2"
      >
        <li>Workorder2</li>
      </Link>
      <Link
        className={classNames(styles.linkContainer)}
        href="/components/ProductionApproval"
      >
        {" "}
        <li>Production Approval</li>
      </Link>
      <Link
        className={classNames(styles.linkContainer)}
        href="/components/QualityApproval"
      >
        <li>Quality Approval</li>
      </Link>
      {/* <Link
        className={classNames(styles.linkContainer)}
        href="/components/TotalRoom"
      >
        <li>Total Room</li>
      </Link> */}

      <Link
        className={classNames(styles.linkContainer)}
        href="/components/ToolLife"
      >
        <li>Tool Life</li>
      </Link>
      <Link
        className={classNames(styles.linkContainer)}
        href="/components/Settings/VerificationPage"
      >
        <li>Settings</li>
      </Link>
    </ul>
  );
};
export default Navigation;
