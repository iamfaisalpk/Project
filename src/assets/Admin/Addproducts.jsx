import React, { useState } from "react";

const Addproducts = () => {
const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "", 
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (response.ok) {
        alert("Product added successfully!");
        setProduct({ 
        name: "", 
        price: "", 
        description: "", 
        category: "",
        imageUrl: "" 
        });
    }
    } catch (error) {
    console.error("Error adding product:", error);
    }
};

const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
};

return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    <h2 className="text-2xl font-bold mb-6 text-orange-800">
        Add New Product
    </h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <label className="block text-sm font-medium text-orange-700">
            Product Name
        </label>
        <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full  border-orange-300 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            placeholder="Enter product name"
            required
        />
        </div>

        <div>
        <label className="block text-sm font-medium text-orange-700">
            Price
        </label>
        <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full  border-orange-300 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            placeholder="Enter price"
            required
        />
        </div>

        <div>
        <label className="block text-sm font-medium text-orange-700">
            Description
        </label>
        <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full  border-orange-300 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            placeholder="Enter product description"
            rows="3"
        />
        </div>

        <div>
        <label className="block text-sm font-medium text-orange-700">
            Category
        </label>
        <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 block w-full  border-orange-300 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            placeholder="Enter category"
            required
        />
        </div>

        <div>
        <label className="block text-sm font-medium text-orange-700">
            Image URL
        </label>
        <input
            type="url"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full  border-orange-300 shadow-sm focus:border-orange-400 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
            required
        />
        </div>

        <button
        type="submit"
        className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-md shadow-md
                    cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
            Add Product
        </button>
    </form>
    </div>
);
};

export default Addproducts;