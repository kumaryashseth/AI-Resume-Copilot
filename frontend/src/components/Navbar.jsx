import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold">AI Resume Copilot </h1>
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar