//styles
import styles from "./styles.module.css";

function CodeOutput({ bgColors, arrows }) {
  return (
    <div>
      <h3 className={styles.h3}>CSS Code:</h3>
      <p className={styles.code}>
        background-image: linear-gradient(to {arrows}, {bgColors.color1}, {bgColors.color2})
      </p>
    </div>
  );
}

export default CodeOutput;
