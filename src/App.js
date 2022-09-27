import {Routes, Route} from "react-router-dom"
import { Home } from "./componentes/Home";
import { Login } from "./componentes/Login";
import { Register } from "./componentes/Register";
function App(){
  return(
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      
    </Routes>
  )

}
export default App;

