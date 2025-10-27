# 🛍️ Simple E-Commerce Product Catalog

A full-stack web application built using **React**, **Express**, **Node.js**, and **MongoDB**.  
It allows an admin to **add**, **view**, **edit**, and **delete** products.  
Each product has a **name**, **price**, and **image** (uploaded locally).  

---

## 🚀 Features

- 🧩 **Full CRUD operations**
  - Create new products  
  - View all products in a responsive grid  
  - Update product name, price, and image  
  - Delete products  
- 🖼️ **Image Uploads** (stored locally in `/uploads`)  
- 📱 **Responsive Design** (works on PC, tablet, mobile)  
- 🪟 **Modal View** for product details  
- ⚙️ **Express + MongoDB** backend using Mongoose  

---

## 🏗️ Project Structure

ecommerce-catalog/
│
├── backend/ # Express + MongoDB API
│ ├── server.js
│ ├── models/Product.js
│ ├── routes/products.js
│ ├── uploads/ # Local images stored here
│ └── .env
│
├── frontend/ # React UI
│ ├── src/
│ │ ├── App.js
│ │ ├── components/
│ │ │ ├── ProductForm.js
│ │ │ ├── ProductList.js
│ │ │ └── ProductModal.js
│ │ └── index.css
│ └── package.json
│
└── README.md


---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository


git clone https://github.com/vishweshbhat/ecommerce-catalog.git
cd ecommerce-catalog
2️⃣ Setup the Backend

cd backend
npm install
Create a .env file:


MONGO_URI=mongodb+srv://<your-username>:<password>@cluster.mongodb.net/catalog
PORT=5000
Run backend:



npm start
3️⃣ Setup the Frontend

cd ../frontend
npm install
npm start
Then open your browser:
👉 http://localhost:3000

🧠 Usage
Add Product: Fill name, price, and upload an image

View Products: Shown in a responsive grid

Edit Product: Click “✏️ Edit” to modify name/price/image

Delete Product: Click “🗑 Delete”

View Details: Click on an image to open modal

🧰 Technologies Used
Frontend: React, Axios, CSS

Backend: Node.js, Express, Multer, Mongoose

Database: MongoDB

Styling: Responsive CSS Grid

📦 Example Environment Setup
.env in backend:


MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/catalog
PORT=5000
🚀 Deployment
You can deploy using:

Render for backend (Node/Express)

Vercel / Netlify for frontend (React)

Update API URL in React to point to your deployed backend

👨‍💻 Author
Name: Vishwesh Bhat
Roll Number: 37
Course: Full Stack Development
Project: Simple E-commerce Product Catalog

## 🖼️ Application Snapshots

### 🏠 Home Page
![Home Page](image.png)