import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const {login} =useAuth();
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const data=await loginUser(formData);
      login(data)
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <Paper
        elevation={4}
        className="w-full max-w-md p-6"
      >
        <Typography
          variant="h4"
          className="text-center mb-6"
        >
          Login
        </Typography>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
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

          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Login
          </Button>

          <Typography
            variant="body2"
            className="text-center"
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600"
            >
              Register
            </Link>
          </Typography>
        </form>
      </Paper>

    </div>
  );
};

export default Login;