//styles
import styles from "./styles.module.css";

const arrowButtons = [
  { id: 0, direction: "right top", icon: "up-right" },
  { id: 1, direction: "right", icon: "right" },
  { id: 2, direction: "right bottom", icon: "down-right" },
  { id: 3, direction: "bottom", icon: "down" },
  { id: 4, direction: "left bottom ", icon: "down-left" },
  { id: 5, direction: "left", icon: "left" },
  { id: 6, direction: "left top", icon: "up-left" },
  { id: 7, direction: "top", icon: "up" },
];

function Buttons({
  inputColors,
  setInputColors,
  buttonOnClick,
  arrows,
  setArrows,
}) {
  return (
    <>
      <p className={styles.directionPickerP}>Pick Gradient Direction</p>
      <div className={styles.arrowButtons}>
        {arrowButtons.map((arrow) => (
          <i
            key={arrow.id}
            className={`bi bi-arrow-${arrow.icon} ${styles.arrowBtn} ${
              arrows === arrow.direction && styles.selected
            }`}
            onClick={() => setArrows(arrow.direction)}
          ></i>
        ))}
      </div>

      <div className={styles.colorPicker}>
        <div className={styles.colorPickerBtn}>
          <p className={styles.colorPickerP}>Pick First Color</p>
          <input
            type="color"
            className="color1"
            value={inputColors.color1}
            onChange={(e) =>
              setInputColors({ ...inputColors, color1: e.target.value })
            }
          />
        </div>

        <div className={styles.colorPickerBtn}>
          <p className={styles.colorPickerP}>Pick Second Color</p>
          <input
            type="color"
            className="color2"
            value={inputColors.color2}
            onChange={(e) =>
              setInputColors({ ...inputColors, color2: e.target.value })
            }
          />
        </div>
      </div>

      <button onClick={buttonOnClick} className={styles.changeBtn}>
        Change Background Color
      </button>
    </>
  );
}

export default Buttons;
