import io from "socket.io-client";

let socket;

export const initSocket = () => {
  socket = io("https://realtime-color-app.herokuapp.com/", {
    transports: ["websocket"],
  });

  console.log("Connecting...");
  socket.on("connect", () => console.log("Connected!"));
};

export const disconnectSocket = () => {
  console.log("Disconnecting...");
  if (socket) socket.disconnect();
};

export const setGradientColors = (data) => {
  console.log("data", data);
  if (socket) socket.emit("new-bg", data);
};

export const subscribeToColor = (cb) => {
  if (!socket) return true;

  socket.on("receive-bg", (data) => {
    console.log("bg changed: ", data);
    cb(data);
  });
};

// The data the user will see on the page when connected
export const initialData = (setBgColors, setInputColors, setLastName) => {
  if (!socket) return true;

  socket.on("initial-data", (data) => {
    console.log("init data: ", data);
    setBgColors(data.colors);
    setInputColors(data.colors);
    setLastName(data.name);
  });
};
