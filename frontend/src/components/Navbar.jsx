import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const {user,logout}=useAuth();
  return (
    <nav className="bg-black text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold">AI Resume Copilot </h1>
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar