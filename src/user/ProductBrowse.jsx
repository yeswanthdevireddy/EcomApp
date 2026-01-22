import { useState } from "react";
import { useEffect } from "react";
import { searchProducts } from "../apis/product";
import { useNavigate } from "react-router-dom";

export default function ProductBrowse() {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    searchProducts(q).then(r => setProducts(r.data));
  }, [q]);

  const [category,setCategory] = useState();

  return (
    <>
      <h2>Products</h2>
      <input placeholder="Search..." onChange={e => setQ(e.target.value)} />

      <ul>
        {products.map(p =>
          <li key={p.id}>
            {p.productName} — ₹{p.price}
          </li>
        )}
      </ul>

    </>
  );
}
