import api from "../api/axios";

export const loginApi = (username, password) => {
  const body = new URLSearchParams();
  body.append("username", username);
  body.append("password", password);

  return api.post("/login", body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const registerUserApi = (data) =>
  api.post("/user/register", data);

export const registerAdminApi = (data) =>
  api.post("/admin/register", data);

export const getMe = () => api.get("/auth/me");

