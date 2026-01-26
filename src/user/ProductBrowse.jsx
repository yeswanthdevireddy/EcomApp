import { useEffect, useState } from "react";
import { searchProducts } from "../apis/product";
import Card from "../Card";

export default function ProductBrowse() {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    searchProducts(q)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [q]);

  return (
    <>
      <h2>Products</h2>

      <input
        placeholder="Search..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />

      <div style={styles.grid}>
        {products.map(product => (
          <Card key={product.id} product={product} />
        ))}
      </div>
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
