import { Routes, Route } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Layout from "./components/Product/Layout";
import CartLayout from "./components/Carts/CartLayout";
import CartPage from "./components/Carts/CartsTable";
import PostPage from "./components/Post/PostTable";
import AlbumPage from "./components/Album/AlbumTable";
import { useTheme } from "./context/ThemeContext";
import Dashboard from "./components/Dashboard";

function App() {
  const { theme } = useTheme();

  return (
  <div
  className={`flex h-screen w-screen overflow-hidden ${
    theme === "dark"
      ? "bg-gradient-to-br from-[#0B1626] to-[#1E3557] text-white"
      : "bg-[#E7ECFF] text-[#3A4752]"
  }`}
>

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden" style={{marginLeft: "80px"}}>
        <Navbar />

    
        <main className="flex-1 w-full p-2 overflow-hidden mb-2">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Layout />} />
            <Route path="/carts" element={<CartLayout />} />
            <Route path="/posts" element={<PostPage />} />
            <Route path="/album" element={<AlbumPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
