
import './App.css';
import io from 'socket.io-client'
import {useEffect,useState} from "react"
const socket = io.connect("http://localhost:3001")

function App() {
  const [message,setMessage]=useState("")
  const [msg,setMsg]=useState("")
  const [room,setRoom]=useState("")

  const joinRoom =()=>{
    if(room !== ""){
      socket.emit("join-room",room)
    }
    
  }
  const sendMsg= ()=>{
     socket.emit("send-msg",{message,room})}
  useEffect(()=>{
    socket.on("reseive-msg",(data)=>{
      setMsg(data.message)
    })
  },[socket])
  return (
    <div className="App">
      <div>
        <input placeholder='join room' onChange={(event)=>{
          setRoom(event.target.value)
        }}/>
        <button onClick={joinRoom}>join</button>
      </div>
      <input placeholder='message...' onChange={(event)=>{
        setMessage(event.target.value);
      }}/>
      <button onClick={sendMsg}>Send Message</button>
      <h1>Message : </h1>{msg}
    </div>
  );
}

export default App;
