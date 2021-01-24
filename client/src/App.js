import { useState, useEffect } from "react";
import {
  initSocket,
  disconnectSocket,
  setColor,
  subscribeToColor,
  initialColor,
} from "./socketService";
import "./App.css";

function App() {
  const [bgColor, setBgColor] = useState("#000");
  const [inputColor, setInputColor] = useState("#000");

  useEffect(() => {
    initSocket();
    initialColor(setBgColor, setInputColor);

    subscribeToColor((bg) => {
      setBgColor(bg);
      setInputColor(bg);
    });

    return () => disconnectSocket();
  }, [bgColor]);

  const buttonOnClick = () => {
    setBgColor(inputColor);
    setColor(inputColor);
  };

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <h3 className="hexCode">
        Background Color Hex Code
        <br />
        {bgColor}
      </h3>
      <input
        type="color"
        className="bgColor"
        value={inputColor}
        onChange={(e) => setInputColor(e.target.value)}
      />
      <button onClick={buttonOnClick}>Change Background Color</button>
    </div>
  );
}

export default App;
