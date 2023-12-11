import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import "./Login.module.css";

export const Login = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location?.state?.from || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(data, () => navigate(from, { replace: true }));
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="login"
          onChange={handleChange}
          type="text"
          name="login"
        />
        <Button
          variant="filled"
          color="gray"
          size="xl"
          radius="lg"
          type="submit"
          fullWidth
        >
          Log in
        </Button>
      </form>
    </div>
  );
};
