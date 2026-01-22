import { useState, useEffect } from "react";
import { addProduct } from "../apis/product";
import { getCategories } from "../apis/category";
import { useNavigate } from "react-router-dom";

function AddProduct() {
   
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    getCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const submit = async () => {
    if (!selectedCategoryId) {
      alert("Category is required");
      return;
    }

    try {
      await addProduct(product, selectedCategoryId);
      alert("Product added successfully");

      // reset form
      setProduct({ productName: "", price: "", stock: "" });
      setSelectedCategoryId("");
    } catch (err) {
      alert("Failed to add product");
      console.error(err);
    }
  };

  return (
    <>
      <h3>Add Product</h3>

      <input
        type="text"
        placeholder="Enter name"
        value={product.productName}
        onChange={e =>
          setProduct({ ...product, productName: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Enter price"
        value={product.price}
        onChange={e =>
          setProduct({ ...product, price: e.target.value })
        }
      />

      <input
        type="number"
        placeholder="Enter stock"
        value={product.stock}
        onChange={e =>
          setProduct({ ...product, stock: e.target.value })
        }
      />

      <select
        value={selectedCategoryId}
        onChange={e => setSelectedCategoryId(e.target.value)}
      >
        <option value="">Select category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.categoryName}
          </option>
        ))}
      </select>

      <button onClick={submit}>Save</button>

      <br />
      <button onClick={()=>navigate("/admin/dashboard")}>back to dashboard</button>
    </>
  );
}

export default AddProduct;
