import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import {
  getCartApi,
  addToCartApi,
  decreaseQuantityApi,
  removeItemApi
} from "../apis/cart";
import { checkOutApi } from "../apis/order";
import { useNavigate } from "react-router-dom";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔄 Load Cart
  const loadCart = async () => {
    if (!user || user.role !== "ROLE_USER") return;

    setLoading(true);
    try {
      const res = await getCartApi();
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user?.id]);

  // ➕ Add
  const addToCart = async (productId, qty = 1) => {
    try {
      await addToCartApi(productId, qty);
      loadCart();
    } catch (err) {
      alert("Failed to add item");
    }
  };

  // ➖ Decrease
  const decreaseQuantity = async (productId) => {
    try {
      await decreaseQuantityApi(productId);
      loadCart();
    } catch (err) {
      alert("Failed to decrease quantity");
    }
  };

  // ❌ Remove
  const removeFromCart = async (productId) => {
    try {
      await removeItemApi(productId);
      loadCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  // 💰 Checkout
  const handleOrder = async () => {
    setCheckoutLoading(true);

    try {
      await checkOutApi();

      alert("Order Placed Successfully 🎉");

      setCart([]); // Clear UI immediately
      navigate("/orders");

    } catch (err) {
      console.error(err);
      alert("Order Failed");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // 🧮 Calculate total
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        checkoutLoading,
        totalAmount,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        reloadCart: loadCart,
        handleOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
