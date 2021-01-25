import { useState, useEffect } from "react";
import {
  initSocket,
  disconnectSocket,
  setGradientColors,
  subscribeToColor,
  initialData,
} from "./socketService";
import "./App.css";

function App() {
  //background colors
  const [bgColors, setBgColors] = useState({
    color1: "#6438bc",
    color2: "#B408A4",
  });

  // input colors
  const [inputColors, setInputColors] = useState({
    color1: "#6438bc",
    color2: "#B408A4",
  });

  // the user name
  const [userName, setUserName] = useState("");

  // the user who made the last change
  const [lastName, setLastName] = useState("...");

  useEffect(() => {
    if (!userName) {
      const name = prompt("Lütfen Kullanıcı Adınızı Giriniz!");
      setUserName(name ? name : "*nameless*");
    }
  }, [userName]);

  useEffect(() => {
    initSocket();
    initialData(setBgColors, setInputColors, setLastName);

    subscribeToColor((data) => {
      setBgColors(data.colors);
      setInputColors(data.colors);
      setLastName(data.name);
    });

    return () => disconnectSocket();
  }, [bgColors.color1, bgColors.color2]);

  const buttonOnClick = () => {
    setBgColors(inputColors);
    setGradientColors({
      colors: inputColors,
      name: userName,
    });
  };

  return (
    <div
      className="App"
      style={{
        background: `linear-gradient(to right,  ${bgColors.color1},${bgColors.color2})`,
      }}
    >
      <h1 className="hexCode">Welcome {userName}</h1>
      <br />
      <h3 className="hexCode">
        Background Color Hex Code
        <br />
        {/* {bgColor} */}
      </h3>
      <input
        type="color"
        className="color1"
        value={inputColors.color1}
        onChange={(e) =>
          setInputColors({ ...inputColors, color1: e.target.value })
        }
      />
      <input
        type="color"
        className="color2"
        value={inputColors.color2}
        onChange={(e) =>
          setInputColors({ ...inputColors, color2: e.target.value })
        }
      />
      <button onClick={buttonOnClick}>Change Background Color</button>
      <br />
      <h4 className="hexCode">
        <em>Last changed by {lastName}</em>
      </h4>
    </div>
  );
}

export default App;
