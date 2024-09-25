import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { Blog } from "./pages/blog/blog";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Home } from "./pages/home/home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
  );
}

export default App;
