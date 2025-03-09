import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAdminLogin = (e) => {
        e.preventDefault();
        setError("");

        if (email === "admin@gmail.com" && password === "admin") {
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } else {
            setError("Invalid admin credentials!");
        }
    };

    return (
        <div className="container px-5 py-24 mx-auto flex">
            <div className="bg-gray-800 rounded-lg p-8 flex flex-col mx-auto mt-8 md:mt-0 shadow-md text-white w-[500px]">
                <h2 className="text-white text-4xl mb-5 font-medium title-font">Admin Login</h2>
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-white">Email</label>
                    <input
                        type="email"
                        id="email"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>

                <button
                    onClick={handleAdminLogin}
                    className="text-white cursor-pointer bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                    Admin Login
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
