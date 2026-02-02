import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  getCartApi,
  addToCartApi,
  decreaseQuantityApi,
  removeItemApi
} from "../apis/cart";

const CartContext = createContext(null);


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user} = useAuth();

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await getCartApi();
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "ROLE_USER") {
      loadCart();
    }
  }, [user]);


  const addToCart = async (productId, qty = 1) => {
  await addToCartApi(productId, qty);
  loadCart();
};


  const decreaseQuantity = async (productId) => {
    await decreaseQuantityApi(productId);
    loadCart();
  };

  const removeFromCart = async (productId) => {
    await removeItemApi(productId);
    loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        reloadCart: loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
