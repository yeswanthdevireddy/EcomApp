import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <h2>Admin Dashboard</h2>

      <ul>
        <li><Link to="/admin/category">Add Category</Link></li>
        <li><Link to="/admin/product">Add Product</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>

      <p>items added</p>
    </>
  );
}
