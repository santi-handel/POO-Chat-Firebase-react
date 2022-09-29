import { useEffect, useState } from "react";
import { db } from "./firebase";

export const useChat= () =>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [messages, setMessages] = useState([])

    useEffect(
        ()=> {
            const unsubscribe =  db.collection("messages").onSnapshot(
                snapshot => {
                    setLoading(false)
                    setMessages(snapshot.docs.map(d => ({id: d.id, ...d.date()})));
    
                },
                err => {
                    setError(err)
                }
            );
            return unsubscribe()

        },
        [setMessages]
    )

        return {error, loading, messages}

}