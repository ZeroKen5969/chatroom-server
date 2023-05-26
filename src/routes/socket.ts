import { Server, Socket } from "socket.io";

export function RegisterSocketRoutes(server: Server) {
    server.on("connection", (socket) => {
        console.log("user connected");

        socket.join("chatPage");

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        socket.on("chat",(res) => {
            socket.broadcast.to("chatPage").emit("chat", {data: res});
            socket.emit("chat", {data: res})
        })
    });
}