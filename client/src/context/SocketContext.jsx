import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "../store";
import { HOST } from "../utils/constant";
import { io } from "socket.io-client"; // make sure this is imported


const SocketContext = createContext(null); // fixed name

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => { // fixed props
    const socket = useRef(null);
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id }
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            const handleRecieveMessage = (message) =>{
                const { selectedChatData, selectedChatType , addMessage }  = useAppStore.getState();

                if( 
                    selectedChatType !== undefined &&
                    ( selectedChatData._id === message.sender._id || 
                    selectedChatData._id === message.recipient._id))
                    {
                        console.log("message recieved", message);
                        addMessage(message);
                    }

            };

            socket.current.on("recieveMessage", handleRecieveMessage)
            return () => {
                socket.current.disconnect(); // fixed typo
            };
        }
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
