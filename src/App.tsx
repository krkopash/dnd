import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"
import Dnd from "./pages/Dnd"
import "./App.css"
import Resize from "./pages/Resize"
import Members from "./pages/members"

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar/>

      <div style={{ padding: "20px", flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
                  <Route path="/dnd" element={<Dnd/>} />
                  <Route path="/resize" element={<Resize/>}/>
                  <Route path="/members" element={<Members/>}/>
        </Routes>
      </div>
    </div>
  )
}