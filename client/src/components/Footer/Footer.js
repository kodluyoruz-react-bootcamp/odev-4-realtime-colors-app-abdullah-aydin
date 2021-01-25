import { memo } from "react";
//styles
import styles from "./styles.module.css";
//logo
import logo from "../../assets/icons/github-logo.png";

function Footer() {
  return (
    <div className={styles.container}>
      <h3 className={styles.h3}>Abdullah Aydın</h3>
      <a href="https://github.com/abdullah-aydin" className={styles.link}>
        <img src={logo} alt="" className={styles.githubIcon} />
      </a>
    </div>
  );
}

export default memo(Footer);
