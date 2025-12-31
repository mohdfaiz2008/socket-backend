import express from "express";
import http from "http"
import { Server } from "socket.io";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React app
    methods: ["GET", "POST"],
  },
});

app.get("/",(req,res)=>{
  return res.json({msg: "server is started"});
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", (data) => {
    // send message to all users
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("Server running on port 5000");
});
