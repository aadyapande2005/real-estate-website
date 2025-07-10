import { useContext, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/authcontext";
import apiRequest from "../../lib/apiRequest";

function Chat({chats}) {
  const [chat, setChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [error, setError] = useState(null);
  const {currentUser} = useContext(AuthContext)

  const textref = useRef()

  async function handleChat(chatId,sender) {
    try {
      const currchat = await apiRequest.get("/chats/" + chatId);
      setMessages(currchat.data.messages);
      setSender(sender)
      setChatId(chatId);
      setChat(true)
    } catch (error) {
      console.error("Failed to load chat:", error);
      alert("Failed to load chat. Please try again later.");          
    }
  }

  async function handleSendMessage(e) {
    const text = textref.current.value;
    console.log(text)
    if (!text) return;

    try {
      const response = await apiRequest.post(`/message/${chatId}`, {
        text,
      });
      // setMessages((prev) => [...prev, response.data]);
      console.log(response.data)
      textref.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

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

          <div className="center">
          {messages.map((message) => {
              const isOwnMessage = message.userId === currentUser.id;
              return (
                <div className={`chatMessage ${isOwnMessage ? "own" : ""}`} key={message.id}>
                  <p>{message.text}</p>
                  <span>1 hour ago</span>
                </div>
              );
            })}
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