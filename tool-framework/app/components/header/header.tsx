import classNames from "classnames";
import { User } from "lucide-react";
import Image from "next/image";
import { styles } from "./styles";
import Link from "next/link";
const Header = () => {
  return (
    <div className={classNames(styles.headerContainer)}>
      <div className={classNames(styles.logoContainer)}>
        <Image
          src="https://mjtechsolutions.in/images/logo.jpg"
          alt="person"
          width={500}
          height={100}
          style={{ objectFit: "fill" }}
        />
      </div>
      <div className={classNames(styles.titleContainer)}>TOOL FRAMEWORK</div>
      <div className={classNames(styles.userContainer)}>
        <div className={classNames(styles.userSubContainer)}>
          <Link href="/components/Profile">
            <User />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Header;
