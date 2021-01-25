//styles
import styles from './styles.module.css';

function LastName({ lastName }) {
  return (
    <p className={styles.asd}>
      Last changed by <strong>{lastName}</strong>
    </p>
  );
}

export default LastName;
