import { useState, useEffect } from "react";
import {
  initSocket,
  disconnectSocket,
  setColor,
  subscribeToColor,
  initialData,
} from "./socketService";
import "./App.css";

function App() {
  const [bgColor, setBgColor] = useState("#000");
  const [inputColor, setInputColor] = useState("#000");

  const [initName, setInıtName] = useState("..."); 
  const [userName, setUserName] = useState("");

  useEffect(() => {
    initSocket();
    initialData(setBgColor, setInputColor, setInıtName);

    subscribeToColor((data) => {
      setBgColor(data.color);
      setInputColor(data.color);
    });

    return () => disconnectSocket();
  }, [bgColor]);

  useEffect(() => {
    if (!userName) {
      const uName = prompt("Lütfen Adınızı Giriniz!");
      setUserName(uName);
    }
  }, [userName]);

  const buttonOnClick = () => {
    setBgColor(inputColor);
    setColor({
      color: inputColor,
      name: userName,
      date: new Date(),
    });
  };

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <h1 className="hexCode">Hoş Geldin {userName}</h1>
      <br />
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
      <br />
      <h2 className="hexCode">En son {initName} tarafından değiştirildi.</h2>
    </div>
  );
}

export default App;
