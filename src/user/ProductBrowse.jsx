import { useEffect, useRef, useState } from "react";
import { searchProducts } from "../apis/product";
import Card from "../Card";
import { useNavigate } from "react-router-dom";

export default function ProductBrowse() {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    searchProducts(q)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [q]);

  useEffect(()=>{
    inputRef.current && inputRef.current.focus();
  },[])

  return (
    <>
      <h2>Products</h2>

      <input
        placeholder="Search..."
        value={q}
        onChange={e => setQ(e.target.value)}
        ref={inputRef}
      />
      <select disabled>
        <option>Filters (coming soon)</option>
      </select>


      <div style={styles.grid}>
        {products.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>

       <button onClick={()=>navigate("/user/cart")}>Go to Cart</button>
    </>
  );
}

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 20
  }
};
