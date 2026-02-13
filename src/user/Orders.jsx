import { useEffect, useState } from "react";
import { getMyOrdersApi } from "../apis/order";
import OrderCard from "../OrderCard";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await getMyOrdersApi();
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading orders...</h2>;

  if (orders.length === 0) return <h2>No orders yet</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
