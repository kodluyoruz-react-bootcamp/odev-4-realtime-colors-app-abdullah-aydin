const app = require('express')();
const http = require('http').createServer(app);
const io = require("socket.io")(http);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

let initColor ="#da1010"

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("new-bg", (bg) => {
    socket.broadcast.emit("receive-bg", bg);
    initColor=bg;
  });

  socket.emit("initial-color",initColor);
  
  socket.on("disconnect", () => console.log("a user disconnected"));
});


http.listen(3001, () => {
  console.log('listening on *:3001');
});







