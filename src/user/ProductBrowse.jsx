export default function ProductBrowse() {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    searchProducts(q).then(r => setProducts(r.data));
  }, [q]);

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
