import { createContext, useContext, useEffect, useState } from "react";
import io from 'socket.io-client';
import useHeaders from "../hooks/useHeaders";

const SocketContext = createContext(null);

// export context as a custom hook
export const useSocketContext = () => useContext(SocketContext);

// provider
export const SocketProvider = ({ roomId, children }) => {
  const [socket, setSocket] = useState();
  const [headers, isLoadingHeaders] = useHeaders();

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

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
};