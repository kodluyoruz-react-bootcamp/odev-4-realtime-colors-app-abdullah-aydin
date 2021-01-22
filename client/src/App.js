import { useState } from "react";
import "./App.css";

function App() {
  const [bgColor, setBgColor] = useState("#000");
  const [inputColor, setInputColor] = useState("#000");
  const [hexCode, setHexCode] = useState("#000");

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <h3 className="hexCode">
        Background Color Hex Code
        <br />
        {hexCode}
      </h3>
      <input
        type="color"
        className="bgColor"
        value={inputColor}
        onChange={(e) => setInputColor(e.target.value)}
      />
      <button
        onClick={() => {
          setBgColor(inputColor);
          setHexCode(inputColor);
        }}
      >
        Change Background Color
      </button>
    </div>
  );
}

export default App;
