import { useCart } from "./context/CartContext";

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();

  if (!cart.length) return <p>Your cart is empty</p>;

  return (
    <>
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

          <button onClick={() => removeFromCart(item.productId)}>
            Remove
          </button>
        </div>
      ))}
    </>
  );
};

const styles = {
  item: {
    border: "1px solid #ddd",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6
  }
};

export default Cart;
