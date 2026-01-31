import { Link } from "react-router-dom";

export default function UserDashboard() {
  return (
    <>
      <h2>User Dashboard</h2>

      <ul>
        <li><Link to="/products">Products</Link></li>    
      </ul>

      <ul>
        <li><Link to="/user/cart">Go to Cart</Link></li>
      </ul>
      
      <p>profile</p>
      <p>orders</p>
      <p>chat with agent</p>
    </>
  );
}
