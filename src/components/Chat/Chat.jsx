import { useContext, useRef, useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./chat.scss";
import { AuthContext } from "../../context/authcontext";
import apiRequest from "../../lib/apiRequest";

const SOCKET_URL = "https://real-estate-website-backend-2ub3.onrender.com"; 

function Chat({chats}) {
  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [error, setError] = useState(null);
  const {currentUser} = useContext(AuthContext)
  const textref = useRef()
  const messagesContainerRef = useRef(null);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  async function handleChat(chatId,sender) {
    try {
      const currchat = await apiRequest.get("/chats/" + chatId);
      setMessages(currchat.data.messages);
      setSender(sender)
      setChatId(chatId);
      setChat(true)
      if (socket) {
        socket.emit("joinRoom", chatId);
      }
    } catch (error) {
      console.error("Failed to load chat:", error);
      alert("Failed to load chat. Please try again later.");          
    }
  }

  async function handleSendMessage(e) {
    const text = textref.current.value;
    if (!text) return;

    try {
      const response = await apiRequest.post(`/message/${chatId}`, { text });
      textref.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again later.");
    }
  }

  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };
    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat">
      <h1>Messages</h1>
      <div className="messages">
        {chats.map((chat) => {
          const sender = chat.users.find(user => user.id !== currentUser.id);
          return (
            <div className="message" key={chat.id} onClick={() => handleChat(chat.id,sender)}>
              <img
                src={sender.avatar || "default-profile.avif"}
                alt=""
              />
              <span>{sender.username}</span>
              <p>{chat.lastMessage}</p>
            </div>
          )
        })}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={sender.avatar || "default-profile.avif"}
                alt=""
              />
              {sender.username}
            </div>
            <span className="close" onClick={()=>setChat(null)}>x</span>
          </div>

          <div className="center" style={{overflowY: 'auto', maxHeight: '400px'}} ref={messagesContainerRef}>
            {(() => {
              if (messages.length === 0) return null;
              const groups = [];
              let lastDate = null;
              messages.forEach((message, idx) => {
                const msgDate = message.createdAt ? new Date(message.createdAt) : new Date();
                const dateStr = msgDate.toLocaleDateString();
                if (dateStr !== lastDate) {
                  groups.push(
                    <div key={"date-" + dateStr} className="date-separator" style={{textAlign: 'center', margin: '10px 0', color: '#888'}}>
                      {dateStr}
                    </div>
                  );
                  lastDate = dateStr;
                }
                const isOwnMessage = message.userId === currentUser.id;
                groups.push(
                  <div className={`chatMessage ${isOwnMessage ? "own" : ""}`} key={message.id}>
                    <p>{message.text}</p>
                    <span>{message.createdAt ? msgDate.toLocaleTimeString() : ""}</span>
                  </div>
                );
              });
              return groups;
            })()}
          </div>

          <div className="bottom">
            <textarea ref={textref}></textarea>
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;