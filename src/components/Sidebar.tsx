import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div style={{width:"200px",height:"100vh", padding:"20px", backgroundColor:"beige"}}>
      <h2>Board</h2>      
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/dnd">dnd</Link></li>
          <li><Link to="/resize">resize</Link></li>
        </ul>
      </nav>
    </div>
  )
}