import { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {

      const data=await registerUser(formData);
      console.log(data);

      alert(data.message);
    } catch (error) {
      console.error(error);
      
      alert(error.response.data.message);
    }
    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Paper elevation={3} className="w-full max-w-md p-6">
        <Typography variant="h4" className="text-center mb-6">
          Register
        </Typography>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Full Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" size="large">
            Register
          </Button>

          <Typography variant="body2" className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </div>
  );
};

export default Register;
