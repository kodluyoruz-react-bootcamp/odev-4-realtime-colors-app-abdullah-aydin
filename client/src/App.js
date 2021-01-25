import { useState, useEffect } from "react";
import {
  initSocket,
  disconnectSocket,
  setGradientColors,
  subscribeToColor,
  initialData,
} from "./socketService";
import "./App.css";
//components
import Title from "./components/Title";
import LastName from "./components/LastName";
import CodeOutput from "./components/CodeOutput";
import Buttons from "./components/Buttons";
import Footer from "./components/Footer";

function App() {
  //background colors
  const [bgColors, setBgColors] = useState({
    color1: "#e52e2e",
    color2: "#c0ec22",
  });
  // input colors
  const [inputColors, setInputColors] = useState({
    color1: "#e52e2e",
    color2: "#c0ec22",
  });
  // the user name
  const [userName, setUserName] = useState("");
  // the user who made the last change
  const [lastName, setLastName] = useState("*nameless*");
  const [arrows, setArrows] = useState("bottom");

  //asks for username when opening the page
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
    userName && (
      <div
        className="App"
        style={{
          backgroundImage: `linear-gradient(to ${arrows},  ${bgColors.color1}, ${bgColors.color2})`,
        }}
      >
        <Title userName={userName} />
        <Buttons
          inputColors={inputColors}
          setInputColors={setInputColors}
          buttonOnClick={buttonOnClick}
          arrows={arrows}
          setArrows={setArrows}
        />
        <CodeOutput bgColors={bgColors} arrows={arrows} />
        <LastName lastName={lastName} />
        <Footer />
      </div>
    )
  );
}

export default App;
