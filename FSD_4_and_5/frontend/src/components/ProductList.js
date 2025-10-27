import React, { useState } from "react";
import axios from "axios";

export default function ProductList({ products, onDelete, onSelect, onRefresh }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "" });
  const [file, setFile] = useState(null);

  const startEdit = (p) => {
    setEditing(p._id);
    setForm({ name: p.name, price: p.price });
  };

  const saveEdit = async (id) => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    if (file) formData.append("image", file);

    await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setEditing(null);
    setFile(null);
    onRefresh();
  };

  return (
    <div className="product-grid">
      {products.map((p) => (
        <div key={p._id} className="card">
          <img src={`http://localhost:5000${p.image}`} alt={p.name} onClick={() => onSelect(p)} />
          {editing === p._id ? (
            <>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button onClick={() => saveEdit(p._id)}>Save</button>
            </>
          ) : (
            <>
              <h3>{p.name}</h3>
              <p>${p.price}</p>
              <button onClick={() => startEdit(p)}>✏️ Edit</button>
              <button onClick={() => onDelete(p._id)}>🗑 Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
