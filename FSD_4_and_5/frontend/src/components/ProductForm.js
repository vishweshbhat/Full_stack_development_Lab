import React, { useState } from "react";
import axios from "axios";

export default function ProductForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", price: "" });
  const [file, setFile] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    if (file) formData.append("image", file);

    await axios.post("http://localhost:5000/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setForm({ name: "", price: "" });
    setFile(null);
    onSubmit();
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
      <button>Add</button>
    </form>
  );
}
