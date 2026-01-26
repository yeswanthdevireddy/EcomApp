import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext({
  cart: [],
  addToCart: (product, quantity) => {},
  removeFromCart: (id) => {},
  clearCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {}
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  //  Initialize state from localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  //  Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //  Add to Cart with quantity logic
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If already exists → update quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If new → add with given quantity
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  
  const removeFromCart = (id) => {
  setCart((prevCart) => {
    return prevCart.filter((item) => item.id !== id);
  });
  };

  //  Clear all items
  const clearCart = () => setCart([]);

  const increaseQuantity = (id) => {
    setCart((prevCart)=>prevCart.map((item)=>
    item.id==id?{...item,
      quantity:item.quantity+1}
      :item
    )
  )
  }

  const decreaseQuantity = (id) => {
    setCart((prevCart)=>prevCart.map((item)=>
    item.id==id?{...item,quantity:item.quantity-1}
    :item
  )
)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
