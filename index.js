import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
dotenv.config();

// create new Express Server instance with httpServer
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "corsOrigin",
    credentials: true,
  },
});

app.set("view engine", "ejs");
app.get("/chat", (req, res) => {
  res.render("chat");
});

const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// SOCKET EVENT EMITTERS

// Awaiting client connections
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Receiving message from client
  socket.on("message", (data) => {
    console.log(data);

    socket.broadcast.emit(
      "message",
      `server message: socket id(${socket.id}) sent message --> ${data}`
    );
  });
});
