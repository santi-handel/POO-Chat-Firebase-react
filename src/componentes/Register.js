import {useState} from "react";

export function Register() {
  const {user,setUser} = useState({
    email:"",
    password:"",
  });
  const handleChange= ({target:{name, value}}) => {
    setUser({[name]:value});
  }
  return(
    <form>
       <label htmlFor="email">Email</label>
       <input type="email" placeholder="youremail@company.ltd" 
       onChange={handleChange}
       />

       <label htmlFor="password">Password</label>
       <input type="password" name="password" id="password" 
       onChange={handleChange}
       />

       <button>Register</button>


    </form>
  )
  
}

