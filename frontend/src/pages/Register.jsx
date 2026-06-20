import {
  useState,
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  registerUser,
} from "../services/authService";

const Register = () => {

  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
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

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          await registerUser(
            formData
          );

        alert(data.message);
        navigate("/login")
      } catch (error) {

        alert(
          error.response.data.message
        );

      }
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">

      <form
        onSubmit={handleSubmit}
        className="shadow-lg p-6 rounded w-96"
      >

        <h2 className="text-2xl mb-4">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          className="bg-black text-white w-full p-2 rounded"
        >
          Register
        </button>

      </form>

    </div>
  );
};

export default Register;