import React, { useState } from "react";
import { useCart } from "./CartContext";

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useCart();
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setSearchTerm(e.target.value); // Update search term in context
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search products..."
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;