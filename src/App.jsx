import { BrowserRouter, Routes, Route } from "react-router-dom";
import ToDo from "./ToDo.jsx";
import SignIn from "./Pages/SignInPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </BrowserRouter>
  );
}