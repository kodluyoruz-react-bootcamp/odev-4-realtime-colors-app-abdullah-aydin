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

export const setColor = (bg) => {
  if (socket) socket.emit("new-bg", bg);
};

export const subscribeToColor = (cb) => {
  if (!socket) return true;

  socket.on("receive-bg", (bg) => {
    console.log("bg changed: ", bg);
    cb(bg);
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
