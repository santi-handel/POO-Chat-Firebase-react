import { useState } from "react";
import { useAuth } from "../context/authContext"
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState()

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {

      await login(user.email, user.password)
      navigate('/')
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSingin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }

  }

  return (
    <div className="w-fulll max-w-xs m-auto">

      {error && <Alert message={error}/>}

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
        focus:shadow-outline text-sm">Login</button>


      </form>

      <button onClick={handleGoogleSingin}
      className="bg-slate-50 gover:bg-slate-200 text-black shadow-md
      rounded border-2 border-gray-300 py-2 px-4 w-full"
      >Google Login</button>
    </div>
  )

}

