import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/axios";
import { useAuth } from "./auth/AuthContext";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    api.get("/auth/me")
      .then(res => {
        // res.data should contain username + role
        login(res.data);

        // Redirect based on role
        if (res.data.role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      })
      .catch(() => {
        navigate("/user/login");
      });
  }, []);

  return <p>Signing you in with Google...</p>;
}
