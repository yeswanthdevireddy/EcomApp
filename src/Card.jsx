import { useState } from "react";
import { deleteProduct } from "./apis/product";
import { useAuth } from "./auth/AuthContext";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  const { user } = useAuth();
  const role = user?.role;
  const [qty, setQty] = useState(1);
  const {addToCart} = useCart();
  
  

  return (
    <div style={styles.card}>
      <h3>{product.productName}</h3>

      {/* USER VIEW */}
      {role === "ROLE_USER" && (
        <>
          <p>₹ {product.price}</p>

          <div>
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <span style={{ margin: "0 8px" }}>{qty}</span>
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          <button onClick={()=>{addToCart(product.id, qty),setQty(1)}}>Add to Cart</button>
        </>
      )}

      {/* ADMIN VIEW */}
      {role === "ROLE_ADMIN" && (
        <>
          <p>Category: {product.categoryName}</p>
          <p>Stock: {product.stock}</p>
          <p>Price: {product.price}</p>

          <button
            onClick={() => deleteProduct(product.id)}
            style={{ color: "red" }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Card;


const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 16,
    borderRadius: 8,
    width: 220,
    margin: 10
  }
};


