import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import img from "../HomeSection3/5tT3VQh0_400x400-removebg-preview.png";
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

        try {
            // ee email already undo ennu check cheyyum

            const response = await axios.get(`http://localhost:3000/user?email=${email}`);
            if (response.data.length > 0) {
                setError("Email already exists! Please use a different email.");
                return;
            }

            // Oru unique email aayirikkanam

            await axios.post("http://localhost:3000/user", {
                username,
                email,
                password,
            });

            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            {/* <div className="relative flex justify-center">
                <img src={img} alt="logo" className="w-[200px]" />
            </div> */}
            <div className="container px-5 py-24 mx-auto flex">
                <div className="bg-orange-400 rounded-lg p-8 flex flex-col mx-auto mt-8 md:mt-0 shadow-md text-white w-[500px]">
                    <h2 className="text-white text-4xl mb-5 font-medium title-font">Sign up</h2>
                    {error && <p className="text-red-600 mb-3">{error}</p>}
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-white">User name</label>
                        <input
                            type="text"
                            id="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
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
                        <label htmlFor="password" className="leading-7 text-sm text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <button
                        onClick={handleRegister}
                        className="text-white cursor-pointer bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                        Sign up
                    </button>
                    <p className="text-xl text-white mt-3">
                        Do you have an account? 
                        <Link to="/login" className="cursor-pointer text-xl hover:text-black"> Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
