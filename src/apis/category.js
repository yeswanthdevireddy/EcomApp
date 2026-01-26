import api from "../api/axios";

export const addCategory = (categoryName) =>
  api.post("/category/private/add", { categoryName });

export const getCategories = () =>
  api.get("/category/public/all");

export const deleteCategory = (categoryId) =>
  api.delete('/category/private/${categoryId}');