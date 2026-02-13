import { useEffect, useState } from "react";
import { getAdminSoldProductsApi } from "../apis/order";

const AdminSoldProducts = () => {
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    loadSold();
  }, []);

  const loadSold = async () => {
    try {
      const res = await getAdminSoldProductsApi();
      setSoldItems(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load sold products");
    }
  };

  if (!soldItems.length) return <p>No products sold yet.</p>;

  return (
    <>
      <h2>Sold Products</h2>

      {soldItems.map((item, index) => (
        <div key={index} style={styles.card}>
          <h4>{item.productName}</h4>
          <p>Price: ₹{item.price}</p>
          <p>Quantity Sold: {item.quantity}</p>
          <p>Buyer: {item.buyerUsername}</p>
          <p>Date: {item.orderDate}</p>
        </div>
      ))}
    </>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 12,
    marginBottom: 10,
    borderRadius: 6
  }
};

export default AdminSoldProducts;
