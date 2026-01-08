import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Products from "./pages/Products";

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-12 w-full px-6 flex flex-col overflow-hidden">
        <Navbar />

        <main className="ml-10 w-full p-6 flex-1 overflow-hidden">
          <Products />
        </main>
      </div>
    </div>
  );
}

export default App;
