import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apis/auth";
import { useAuth } from "../auth/AuthContext";

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await loginApi(username, password);
      login({ username, role: "ROLE_USER" });

      navigate("/user/dashboard");
      

    } catch {
      alert("Invalid user credentials");
    }
  };

  const googleLogin = () => {
  window.location.href =
    "http://localhost:5050/oauth2/authorization/google";
  };

  return (
    <>
      <h2>User Login</h2>
      <input onChange={e => setUsername(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>

      <button
        onClick={googleLogin}
        style={{
        marginTop: 12,
        padding: "8px 12px",
        background: "#fff",
        border: "1px solid #ccc",
        cursor: "pointer"
        }}
      >
       Sign in with Google
     </button>


      <p>
        New User? Click here to
        <button onClick={() => navigate("/user/register")}>
          Register
        </button>
      </p>
      <p>
        Not an User? Click here to 
           <button onClick={() => navigate("/admin/login")}>
             Login as Admin
           </button>
      </p>
      
    </>
  );
}
