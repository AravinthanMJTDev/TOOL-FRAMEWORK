import PartDashBoard from "./table";
import { partDB } from "../types";

const PartPage = ({ PartDataBase }: { PartDataBase: partDB }) => {
  console.log(PartDataBase);
  return <PartDashBoard partDataBase={PartDataBase} />;
};
export default PartPage;
