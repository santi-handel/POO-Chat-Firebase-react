import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { db } from "../firebase";
import { doc,updateDoc } from "firebase/firestore";
import { useChat } from "../components/useChat";


export function Home() {

  const [users, setUsers] = useState([])

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      await logout();
      await updateDoc(doc(db,"users",user.uid),{
        isOnline:false,
      })
      navigate("/login");
    } catch (error) {
      console.error(error);
    };
  };
 
  const [message, setMessage] = useState("");
  const onPress = (e) =>{
    e.preventDefault();
    db.collection("messages").add({
      timestamp: Date.now(),
      message
    })
  }
  const { messages, error} = useChat();  

  if (loading) return <h1>loading</h1>

  return <div>
    <div>
         <p>Escribe tu mensaje...</p>
         <form>
          <input value={message} onChange={(e)=>setMessage(e.target.value)}></input>
          <button type="submit" onPress={onPress}>Enviar Mensaje</button>
         </form> 
         <ul>
          {messages.map(m=> <li key={m.id}>{m.message}</li>)}
         </ul>
    </div>

    <button onClick={handleLogout}>
      logout
    </button>
  </div>
}
