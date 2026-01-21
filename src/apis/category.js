import api from "../api/axios";

export const addCategory = (categoryName) =>
  api.post("/category/private/add", { categoryName });

export const getCategories = () =>
  api.get("/category/public/all");