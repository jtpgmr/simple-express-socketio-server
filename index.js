import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

// create new Express Server instance with httpServer
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = 3001;

app.set("view engine", "ejs");

app.get("/chat", (req, res) => {
  res.render("chat");
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


// SOCKET EVENT EMITTERS
io.on('connection', (socket) => {
  
})