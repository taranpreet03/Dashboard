import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Products from "./pages/Products";

function App() {
  const [count, setCount] = useState(0)

  return (
<>
<div className="flex ">
      {/* Sidebar */}
      <Sidebar />

      {/*Navbar*/}
      <div className="ml-12 w-full px-6 transition-all duration-300">
        <Navbar />

        <main className="ml-10 w-full p-6 transition-all duration-300">
          <Products/>
        </main>

      </div>
    </div>
</>
  )
}

export default App
