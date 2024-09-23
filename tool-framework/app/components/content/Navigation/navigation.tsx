import Link from "next/link";

const Navigation = ({ className }: { className: string }) => {
  return (
    <ul className={className}>
      <Link href="/components/DashBoard">
        <li>Dashboard</li>
      </Link>
      <Link href="/components/WorkOrder">
        <li>Workorder</li>
      </Link>
      <Link href="/components/ProductionApproval">
        {" "}
        <li>Production Approval</li>
      </Link>
      <Link href="/components/QualityApproval">
        <li>Quality Approval</li>
      </Link>
      <Link href="/components/TotalRoom">
        <li>Total Room</li>
      </Link>

      <Link href="/components/ToolLife">
        <li>Tool Life</li>
      </Link>
    </ul>
  );
};
export default Navigation;
