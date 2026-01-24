import { Link } from "react-router-dom";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import ProductBrowse from "../user/ProductBrowse";

export default function AdminDashboard() {
  return (
    <>
      <h2>Admin Dashboard</h2>

      <AddCategory/>
      <AddProduct/>
      <ProductBrowse/>

      <p>items added</p>
    </>
  );
}
