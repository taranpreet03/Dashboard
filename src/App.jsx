import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Layout from "./components/Product/Layout";
import CartLayout from "./components/Carts/CartLayout";
import PostPage from "./components/Post/PostTable";
import AlbumPage from "./components/Album/AlbumTable";
import { useTheme } from "./context/ThemeContext";
import Dashboard from "./components/Dashboard";

function App() {
  const { theme } = useTheme();
  // Sidebar State Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        theme === "light"
          ? "bg-[#E7ECFF] text-[#3A4752]"
          : "bg-gradient-to-br from-[#0B1626] to-[#1E3557] text-white"
      }`}
    >
      <div className="flex">

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Main Area */}
        <div className="flex flex-col flex-1 lg:ml-20">

          {/* Navbar */}
          <Navbar setIsSidebarOpen={setIsSidebarOpen} />

          <main className="flex-1 w-full p-2 overflow-auto mb-2">
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
    </div>
  );
}

export default App;
