import { Routes, Route } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import ProductPage from "./components/Product/ProductTable";
import CartPage from "./components/Carts/CartsTable";
import PostPage from "./components/Post/PostTable";
import AlbumPage from "./components/Album/AlbumTable";
import { useTheme } from "./context/ThemeContext";

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

      <div className="ml-12 flex flex-col flex-1 overflow-hidden">
        <Navbar />

    
        <main className="flex-1 w-full p-2 overflow-hidden mb-2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/carts" element={<CartPage />} />
            <Route path="/posts" element={<PostPage />} />
            <Route path="/album" element={<AlbumPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
