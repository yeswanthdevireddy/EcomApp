import { useState } from "react";
import { deleteProduct } from "./apis/product";
const Card = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(q => q + 1);
  };

  const handleDecrease = () => {
    setQuantity(q => (q > 1 ? q - 1 : q));
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete product?")) return;

    try {
      await deleteProduct(product.id);
      alert("Product deleted");
      window.location.reload(); // simple + OK for now
    } catch (err) {
      alert("Failed to delete product");
      console.error(err);
    }
  };

  return (
    <div style={styles.card}>
      <h3>{product.productName}</h3>
      <p>₹ {product.price}</p>
      <p>Category: {product.categoryName}</p>

      <button>Add to Cart</button>

      <div style={{ marginTop: 8 }}>
        <button onClick={handleDecrease}>-</button>
        <span style={{ margin: "0 8px" }}>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>

      <button
        onClick={handleDelete}
        style={{ marginTop: 10, color: "red" }}
      >
        Delete
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 16,
    borderRadius: 8,
    width: 220,
    margin: 10
  }
};

export default Card;
