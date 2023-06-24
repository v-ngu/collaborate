import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";

const useSocketListeners = () => {
  const socket = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const onJoined = (roomId) => console.log("It works");
    const onConnectError = (error) => console.log(error.message);

    socket.on("joined", onJoined);
    socket.on("connect_error", onConnectError);

    return () => {
      socket.off("joined", onJoined)
      socket.off("connect_error", onConnectError)
    };
  }, [socket])

  return;
}

export default useSocketListeners;