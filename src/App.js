import {Routes, Route} from "react-router-dom"
import { Home } from "./componentes/Home";
import { Login } from "./componentes/Login";
import { ProtectedRoute } from "./componentes/ProtectedRoute";
import { Register } from "./componentes/Register";
import {AuthProvider} from "./context/authContext";
function App(){
  return(
    <div className="bg-slate-300 h-screen text-black flex">
    <AuthProvider>
      <Routes>
      <Route path="/" element={ 
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>  
        } 
        />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </AuthProvider>
    </div>
  )
}
export default App;

