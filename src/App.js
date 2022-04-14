import "./App.css";
import { Route, Routes } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      <Route
        path="/forgetPassword"
        element={<ForgetPassword></ForgetPassword>}
      />
    </Routes>
  );
}

export default App;
