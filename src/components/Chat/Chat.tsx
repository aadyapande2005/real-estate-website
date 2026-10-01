import { useRef, useState, useEffect } from "react";
import type { ChangeEvent, MouseEvent, ReactNode } from "react";
import { io } from "socket.io-client";
import "./chat.scss";
import apiRequest from "../../lib/apiRequest";
import type { Chat as ChatData, ChatUser, Message } from "../../types";
import { useAuth } from "../../context/authcontext";
import type { Socket } from "socket.io-client";

const SOCKET_URL = "https://real-estate-website-backend-2ub3.onrender.com"; 

function Chat({chats}: { chats: ChatData[] }) {
  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sender, setSender] = useState<ChatUser | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);
  const [error, setError] = useState(null);
  const {currentUser} = useAuth()
  const textref = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  async function handleChat(chatId: string, sender: ChatUser) {
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

  async function handleSendMessage(_e: ChangeEvent<HTMLTextAreaElement> | MouseEvent<HTMLButtonElement>) {
    const text = textref.current?.value ?? "";
    if (!text) return;

    try {
      const response = await apiRequest.post(`/message/${chatId}`, { text });
      if (textref.current) textref.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again later.");
    }
  }

  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (message: Message) => {
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

  if (!currentUser) return null;

  return (
    <div className="chat">
      <h1>Messages</h1>
      <div className="messages">
        {chats.map((chat) => {
          const sender = chat.users.find(user => user.id !== currentUser.id);
          if (!sender) return null;
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
          {sender && <div className="top">
            <div className="user">
              <img
                src={sender.avatar || "default-profile.avif"}
                alt=""
              />
              {sender.username}
            </div>
            <span className="close" onClick={()=>setChat(false)}>x</span>
          </div>}

          <div className="center" style={{overflowY: 'auto', maxHeight: '400px'}} ref={messagesContainerRef}>
            {(() => {
              if (messages.length === 0) return null;
              const groups: ReactNode[] = [];
              let lastDate: string | null = null;
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