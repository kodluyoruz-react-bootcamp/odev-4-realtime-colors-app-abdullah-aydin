import io from "socket.io-client";

let socket;

export const initSocket = () => {
  socket = io("http://localhost:3001", {
    transports: ["websocket"],
  });

  console.log("Connecting...");
  socket.on("connect", () => console.log("Connected!"));
};

export const disconnectSocket = () => {
  console.log("Disconnecting...");
  if (socket) socket.disconnect();
};

export const setColor = (data) => {
  if (socket) socket.emit("new-bg", data);
};

export const subscribeToColor = (cb) => {
  if (!socket) return true;

  socket.on("receive-bg", (data) => {
    console.log("bg changed: ", data);
    cb(data);
  });
};

export const initialColor = (initColor, inputColor) => {
  if (!socket) return true;

  socket.on("initial-color", (color) => {
    console.log("init color: ", color);
    initColor(color);
    inputColor(color);
  });
};

export const initialData = (initColor, inputColor, initName) => {
  if (!socket) return true;

  socket.on("initial-data", (data) => {
    console.log("init data: ", data);
    initColor(data.color);
    inputColor(data.color);
    initName(data.name);
  });
};
