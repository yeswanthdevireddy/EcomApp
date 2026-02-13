import { useCart } from "./context/CartContext";

const Cart = () => {
  const {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    handleOrder,
    totalAmount,
    loading,
    checkoutLoading
  } = useCart();

  if (loading) return <p>Loading cart...</p>;
  if (!cart.length) return <p>Your cart is empty</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.map(item => (
        <div key={item.productId} style={styles.item}>
          <h4>{item.productName}</h4>
          <p>₹ {item.price}</p>

          <div>
            <button onClick={() => decreaseQuantity(item.productId)}>-</button>
            <span style={{ margin: "0 8px" }}>{item.quantity}</span>
            <button onClick={() => addToCart(item.productId, 1)}>+</button>
          </div>

          <p>
            Subtotal: ₹ {item.price * item.quantity}
          </p>

          <button onClick={() => removeFromCart(item.productId)}>
            Remove
          </button>
        </div>
      ))}

      <hr />

      <h3>Total: ₹ {totalAmount}</h3>

      <button
        onClick={handleOrder}
        disabled={checkoutLoading}
        style={styles.checkout}
      >
        {checkoutLoading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
};

const styles = {
  item: {
    border: "1px solid #ddd",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6
  },
  checkout: {
    marginTop: 15,
    padding: "10px 20px",
    fontSize: 16,
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: 5
  }
};

export default Cart;
