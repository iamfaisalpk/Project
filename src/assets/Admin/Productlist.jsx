// components/ProductList.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <Link to="/admin/products/new" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</Link>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="p-2 border-b">
            {product.name} - ${product.price} 
            <Link to={`/admin/products/${product.id}`} className="ml-4 text-blue-500">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
