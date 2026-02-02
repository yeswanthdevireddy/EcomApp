import { useEffect, useState } from "react";
import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { AdminProductsApi } from "../apis/product";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
       AdminProductsApi()
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <h2>Products Added By You.</h2>

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
