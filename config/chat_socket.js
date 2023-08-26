module.exports.chatSockets = function (socketServer) {
  let io = require("socket.io")(socketServer, {
    cors: {
      origin: "*",
    },
  });

  io.sockets.on("connection", function (socket) {
    console.log("new connection received", socket.id);

    socket.on("disconnect", function () {
      console.log("socket disconnected");
    });

    socket.on("join_name", function (data) {
      console.log("joining request received", data);

      socket.join(data.chatroom);

      io.in(data.chatroom).emit("user_joined", data);
    });
  });
};
