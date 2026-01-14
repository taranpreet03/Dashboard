import { Routes, Route } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import ProductPage from "./components/Product/ProductTable";
import CartPage from "./components/Carts/CartsTable";
import PostPage from "./components/Post/PostTable";
import AlbumPage from "./components/Album/AlbumTable"
function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="ml-12 w-full px-6 flex flex-col overflow-hidden">
        <Navbar />
        <main className="ml-10 w-full p-6 flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/carts" element={<CartPage/>}/>
            <Route path="/posts" element={<PostPage/>}/>
            <Route path="/album" element={<AlbumPage/>}/>
          </Routes>
        </main>
      </div>
    </div> 
  );
}

export default App;