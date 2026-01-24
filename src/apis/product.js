import api from "../api/axios";

export const addProduct = (product) =>
  api.post("/products/private/add", product);

export const searchProducts = (q) =>
  api.get(`/products/public/search?q=${q}`);

export const getByCategory = (id) =>
  api.get(`/products/public/${id}`);

export const getAllProducts = () =>
  api.get("/products/public/all");
