import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import useHeaders from "../hooks/useHeaders";

const SocketContext = createContext(null);

// export context as a custom hook
export const useSocketContext = () => useContext(SocketContext);

// provider
export const SocketProvider = ({ roomId, children }) => {
  // states
  const [socket, setSocket] = useState();
  const [headers, isLoadingHeaders] = useHeaders();

  // create a new socket
  useEffect(() => {
    if (isLoadingHeaders) return;

    const newSocket = io('http://localhost:8000', {
      transports: ["polling", "websocket"],
      extraHeaders: { "Authorization": headers["Authorization"] },
      query: { roomId }
    });
    
    setSocket(newSocket)

    return () => newSocket.close()
  }, [roomId, headers, isLoadingHeaders])

  // handle joining a socket room
  useEffect(() => {
    if (!socket) return;
    
    const handleJoined = (roomId) => console.log(`Joined project ${roomId}`);
    const handleConnectionError = (error) => console.log(error.message);

    socket.on("joined", handleJoined);
    socket.on("connect_error", handleConnectionError);

    return () => {
      socket.off("joined", handleJoined)
      socket.off("connect_error", handleConnectionError)
    };
  }, [socket])

  // provider
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
};