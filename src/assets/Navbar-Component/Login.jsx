import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../HomeSection3/5tT3VQh0_400x400-removebg-preview.png";
import axios from "axios";
import { useCart } from "../Cart/CartContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login, logout } = useCart();  

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.get("http://localhost:3000/user");
            const user = response.data.find((user) => user.email === email);

            if (!user) {
                setError("Email not found. Please register first.");
                return;
            }

            if (user.password !== password) {
                setError("Invalid password. Please try again.");
                return;
            }

            login();  // Perform login action (this may also store user info in localStorage)
            localStorage.setItem("user", JSON.stringify(user));  
            navigate("/home");
        } catch (error) {
            console.error("Error logging in:", error);
            setError("An error occurred. Please try again later.");
        }
    };

    const handleLogout = () => {
        logout();  // Call logout from context
        localStorage.removeItem("user");  // Remove user data from localStorage
        navigate("/login");  // Navigate the user to login page
    };

    return (
        <>
            <div className="relative flex justify-center">
                <img src={img} alt="logo" className="w-[200px]" />
            </div>

            <div className="container px-5 py-24 mx-auto flex">
                <div className="bg-orange-400 rounded-lg p-8 flex flex-col mx-auto mt-8 md:mt-0 shadow-md text-white w-[500px]">
                    <h2 className="text-white text-4xl mb-5 font-medium title-font">Login</h2>
                    {error && <p className="text-red-600 mb-4">{error}</p>}

                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="password" className="text-white leading-7 text-sm">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="text-white cursor-pointer bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                        Login
                    </button>

                    <p className="text-xl text-white mt-3">
                        Don't have an account?
                        <Link to="/register">
                            <button className="cursor-pointer text-xl hover:text-black">
                                Sign up
                            </button>
                        </Link>
                    </p>

                    <button
                        onClick={handleLogout}
                        className="text-white cursor-pointer bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg mt-3"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Login;
