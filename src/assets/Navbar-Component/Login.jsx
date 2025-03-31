import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login, isLoggedIn, userInfo } = useCart();

    useEffect(() => {
        if (isLoggedIn && userInfo) {
            if (userInfo.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/home");
            }
        }
    }, [isLoggedIn, userInfo, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const response = await axios.get("http://localhost:3000/users");
            const users = response.data;

            const user = Array.isArray(users)
                ? users.find((u) => u.email === email)
                : null;

            if (!user) {
                setError("Email not found. Please register first.");
                return;
            }

            if (user.password !== password) {
                setError("Invalid password. Please try again.");
                return;
            }

            const result = login(user);
            if (!result.success) {
                setError(result.error || "Login failed. Please try again.");
                return;
            }
            
            if (user.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="container px-5 py-24 mx-auto flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg p-6 shadow-md w-[400px]">
                <h2 className="text-gray-800 text-3xl mb-6 font-semibold text-center">Admin Login</h2>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors
                        cursor-pointer  duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4 text-sm">
                    Don't have an account?
                    <Link to="/reg" className="text-orange-500 hover:text-orange-700 ml-1">Sign up</Link>
                </p>
            </div>
        </div>
    );
};


export default Login;