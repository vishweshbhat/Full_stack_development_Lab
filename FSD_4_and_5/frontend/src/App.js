import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductModal from "./components/ProductModal";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="app">
      <h1>🛒 Product Catalog</h1>
      <ProductForm onSubmit={fetchProducts} />
      <ProductList
        products={products}
        onDelete={deleteProduct}
        onSelect={setSelected}
        onRefresh={fetchProducts}
      />
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
