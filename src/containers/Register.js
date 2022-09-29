import { useState } from "react";
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export function Register() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const {email,password}=user;
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {

      const result = await signup(
        user.email,
        user.password
        );

      await setDoc(doc(db, 'users', result.user.uid),{
        uid: result.user.uid,
        email,
        createdAt:Timestamp.fromDate(new Date()),
        isOnline:true,
      }
      )
      navigate('/')


    } catch (error) {
      setError(error.message);
    }

  }

  return (
    <div className="w-fulll max-w-xs m-auto">

      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="bg-white shadow-md grounded px-8 
      pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm 
        font-fold mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="youremail@company.ltd"
            className="shadow appearence-none border rounded w-full
          py-2 px-3 block text-gray-700 text-sm 
          font-fold mb-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm 
        font-fold mb-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="******"
            className="shadow appearence-none border rounded w-full
          py-2 px-3 block text-gray-700 text-sm 
          font-fold mb-2"
            onChange={handleChange}
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white
        font-bold py-4 px-4 rounded focus:outline-none
        focus:shadow-outline text-sm">Register</button>



      </form>

      <p className="my-4 text-sm flex justify-between px-3">
        ¿Ya tienes cuenta?
        <Link to='/login' className="text-decoration-line: underline">
          Logueate
        </Link>
      </p>

    </div>
  )

}

