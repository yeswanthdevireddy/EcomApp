const OrderCard = ({ order }) => {

  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginBottom: "20px",
      background: "#f9f9f9"
    }}>

      <h3>Order #{order.id}</h3>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>

      <h4>Items:</h4>

      {order.items.map((item, index) => (
        <div key={index} style={{
          padding: "8px",
          marginBottom: "5px",
          background: "white",
          borderRadius: "4px"
        }}>
          <p><strong>{item.productName}</strong></p>
          <p>Qty: {item.quantity}</p>
          <p>Price: ₹{item.price}</p>
        </div>
      ))}

    </div>
  );
};

export default OrderCard;
