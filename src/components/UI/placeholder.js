import { ClassNames } from "@emotion/react";
import styles from "./placeholder.module.css";

const PlaceHolder = (props) => {
  return <div className={styles.panel}>{props.children}</div>;
};
export default PlaceHolder;
