import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showchat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };

  return (
    <div>
      <h3>Join a chat</h3>
      {!showchat ? (
        <>
          {" "}
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="John..."
          />
          <input
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            placeholder="Room Id..."
          />
          <button onClick={joinRoom}>Join a Room</button>
        </>
      ) : (
        <Chat socket={socket} room={room} username={username} />
      )}
    </div>
  );
}

export default App;
