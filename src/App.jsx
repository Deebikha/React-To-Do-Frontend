import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDo from "./ToDo.jsx";
import SignIn from "./Pages/SignInPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import Board from "./Board.jsx";
import UserManagement from "./UserManagement.jsx";
import Forgot from "./Forgot.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/board" element={<Board />} />
        <Route path="/user-Management" element={<UserManagement />} />
        <Route path="/forgot" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  );
}