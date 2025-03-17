import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/users?email=${email}`);
            if (response.data.length > 0) {
                setError("Email already exists! Please use a different email.");
                return;
            }

            await axios.post("http://localhost:3000/users", {
                username,
                email,
                password,
            });

            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container px-5 py-24 mx-auto flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg p-6 shadow-md w-[400px]">
                <h2 className="text-gray-800 text-3xl mb-6 font-semibold text-center">Sign up</h2>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                            User name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="User Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
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
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                            minLength="6"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600
                        cursor-pointer transition-colors duration-200"
                    >
                        Sign up
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4 text-sm">
                    Do you have an account?
                    <Link to="/login" className="text-orange-500 hover:text-orange-700 ml-1">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;