import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export function Home() {

  const { user, logout, loading } = useAuth();
  const navigate = useNavigate()

  console.log(user);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <h1>loading</h1>


  return <div>
    <h1>welcome {user.displayName || user.email}</h1>

    <button onClick={handleLogout}>
      logout
    </button>
  </div>
}
