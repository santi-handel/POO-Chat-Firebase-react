import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import User from "../components/User";


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
    useEffect( () => {
      const usersRef = collection(db, 'users')
      //creamos el objeto query
      const q= query(usersRef, where('uid','not-in',[user.uid])) 
      //ejecutar el query
      const unsub = onSnapshot(q, querySnapshot =>{
        let lstusers= [];
        querySnapshot.forEach(doc => {
        lstusers.push(doc.data())
        });
        setUsers(lstusers);
      });
      return () => unsub();
    },[user.uid])
  
  console.log(user);
  if (loading) return <h1>loading</h1>


  return (
  <div>
    <div>
      <h1>{users.map(user => <User key={user.uid} user={user}/>)}</h1>     
    </div>

    <button onClick={handleLogout}>
      logout
    </button>
  </div>
  )
}
