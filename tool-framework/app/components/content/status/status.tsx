import Image from "next/image";
import { styles } from "./styles";
import classNames from "classnames";
import Link from "next/link";

const Status = () => {
  return (
    <div className={classNames(styles.body)}>
      <Link
        className={classNames(styles.container)}
        href={`/components/content/status/Accepted`}
      >
        <div className={classNames(styles.box)}>
          <div className={classNames(styles.boxValue, "text-[#007FFF]")}>
            135
          </div>
          <Image
            src="https://icomoon.io/app/icomoon-lib/icons4acad3d/13/573.svg"
            alt="icon"
            className="pr-3"
            height="40"
            width="40"
          />
        </div>
        <div className={classNames(styles.boxName)}>Accepted</div>
        <div className={classNames(styles.boxColor, "bg-[#007FFF]")}>
          &nbsp;
        </div>
      </Link>
      <Link
        className={classNames(styles.container)}
        href={`/components/content/status/Completed`}
      >
        <div className={classNames(styles.box)}>
          <div className={classNames(styles.boxValue, "text-[#20B2AA]")}>
            05
          </div>
          <Image
            src="https://icomoon.io/app/icomoon-lib/icons4acad3d/13/573.svg"
            alt="icon"
            className="pr-3"
            height="40"
            width="40"
          />
        </div>
        <div className={classNames(styles.boxName)}>Completed</div>
        <div className={classNames(styles.boxColor, "bg-[#20B2AA]")}>
          &nbsp;
        </div>
      </Link>
      <Link
        className={classNames(styles.container)}
        href={`/components/content/status/OnHold`}
      >
        <div className={classNames(styles.box)}>
          <div className={classNames(styles.boxValue, "text-[red]")}>38</div>
          <Image
            src="https://icomoon.io/app/icomoon-lib/icons4acad3d/13/573.svg"
            alt="icon"
            className="pr-3"
            height="40"
            width="40"
          />
        </div>
        <div className={classNames(styles.boxName)}>OnHold</div>
        <div className={classNames(styles.boxColor, "bg-red-600")}>&nbsp;</div>
      </Link>
      <Link
        className={classNames(styles.container)}
        href={`/components/content/status/Open`}
      >
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
      </Link>
    </div>
  );
};
export default Status;
