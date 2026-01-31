import api from "../api/axios";

export const addToCartApi = (productId, quantity) =>
  api.post("/cart/add", {
    productId: productId,   
    quantity: quantity
  });

export const decreaseQuantityApi = (productId)=>
    api.post(`/cart/decrease/${productId}`);

export const removeItemApi = (productId)=>
    api.delete(`/cart/remove/${productId}`);

export const getCartApi = ()=>
    api.get("/cart/items");