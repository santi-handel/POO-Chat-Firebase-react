import {Routes, Route} from "react-router-dom"
import { Home } from "./containers/Home";
import { Login } from "./containers/Login";
import { ProtectedRoute } from "./containers/ProtectedRoute";
import { Register } from "./containers/Register";
import {AuthProvider} from "./context/authContext";
function App(){
  return(
    <div>
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

