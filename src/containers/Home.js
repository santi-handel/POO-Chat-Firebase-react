import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { User } from "../components";

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

  if (loading) return <h1>loading</h1>

  return <div>
    <div>
         <p>Escribe tu mensaje...</p>
         <form>
          <input value={message} onChange={(e)=>setMessage(e.target.value)}></input>
          <button type="submit">Enviar Mensaje</button>
         </form> 
    </div>

    <button onClick={handleLogout}>
      logout
    </button>
  </div>
}
