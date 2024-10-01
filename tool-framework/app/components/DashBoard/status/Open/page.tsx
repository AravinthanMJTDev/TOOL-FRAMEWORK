import Main from "@/app/components/Layout/Main";
import Image from "next/image";
import { styles } from "../styles";
import classNames from "classnames";
const Open = () => {
  return (
    <Main>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.box)}>
          <div className={classNames(styles.boxValue, "text-[#00CCFF]")}>
            155
          </div>
          <Image
            src="https://icomoon.io/app/icomoon-lib/icons4acad3d/13/573.svg"
            alt="icon"
            className="pr-3"
            height="40"
            width="40"
          />
        </div>
        <div className={classNames(styles.boxName)}>Open</div>
        <div className={classNames(styles.boxColor, "bg-[#00CCFF]")}>
          &nbsp;
        </div>
      </div>
    </Main>
  );
};
export default Open;
