module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: true,
      credentials: true,
    },
    allowEIO3: true,
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected");
    });

    socket.on("join_room", function (data) {
      console.log("joining request received", data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });

    // Detect send_message and broadcast to everyone in the room
    socket.on("send_message", function (data) {
      io.in(data.chatroom).emit("receive_message", data);
    });
  });
};
