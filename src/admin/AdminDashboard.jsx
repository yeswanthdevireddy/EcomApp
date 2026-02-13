import { Link } from "react-router-dom";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import ProductBrowse from "../user/ProductBrowse";
import AdminProducts from "./AdminProducts";
import AdminSoldProducts from "./AdminSoldProducts";

export default function AdminDashboard() {
  return (
    <>
      <h2>Admin Dashboard</h2>

      <AddCategory/>
      <AddProduct/>
      <AdminProducts/>
      <AdminSoldProducts/>

    </>
  );
}
