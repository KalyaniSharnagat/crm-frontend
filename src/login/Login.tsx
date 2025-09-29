import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#ebedfa] px-4">
            <div className="w-full max-w-4xl bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/40 animate-fadeIn">

                {/* Left Section */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-teal-700 to-teal-500 flex flex-col justify-center items-center text-white p-6 md:p-10 animate-slideInLeft">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide mb-3 text-center animate-bounce">
                        Welcome Back!
                    </h2>
                    <p className="text-sm sm:text-base mb-6 text-center opacity-80">
                        Login to access your dashboard
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 sm:space-y-5">

                        {/* Email Input */}
                        <div className="relative animate-fadeInUp delay-100">
                            <Mail className="absolute left-4 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative animate-fadeInUp delay-200">
                            <Lock className="absolute left-4 top-3 text-gray-400" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-10 py-3 rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-teal-400 text-sm sm:text-base"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2 animate-fadeInUp delay-300 pl-4">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 text-teal-600 focus:ring-teal-400 border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="text-white text-sm select-none">
                                Remember Me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-white text-teal-700 font-bold py-3 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition transform duration-300 text-sm sm:text-base"
                        >
                            LOGIN
                        </button>
                    </form>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-1/2 relative animate-slideInRight h-64 md:h-auto">
                    <img
                        src="/login.jpg"
                        alt="Login Illustration"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
            </div>

            {/* Tailwind Custom Animations */}
            <style>
                {`
                    @keyframes fadeIn { from {opacity:0} to {opacity:1} }
                    .animate-fadeIn { animation: fadeIn 1s ease-in-out; }

                    @keyframes slideInLeft { from {transform:translateX(-100%)} to {transform:translateX(0)} }
                    .animate-slideInLeft { animation: slideInLeft 1s ease-in-out; }

                    @keyframes slideInRight { from {transform:translateX(100%)} to {transform:translateX(0)} }
                    .animate-slideInRight { animation: slideInRight 1s ease-in-out; }

                    @keyframes fadeInUp { from {opacity:0; transform:translateY(20px)} to {opacity:1; transform:translateY(0)} }
                    .animate-fadeInUp { animation: fadeInUp 0.8s ease-in-out; }
                    .delay-100 { animation-delay: 0.2s; }
                    .delay-200 { animation-delay: 0.4s; }
                    .delay-300 { animation-delay: 0.6s; }
                `}
            </style>
        </div>
    );
};

export default Login;
