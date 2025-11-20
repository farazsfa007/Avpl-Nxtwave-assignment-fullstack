import React, { useState, useContext } from 'react';
import API from '../services/api';
import AuthContext from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const { setUser, setToken } = useContext(AuthContext);
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try{
        const res = await API.post('/auth/login', { username, password });
        setToken(res.data.token);
        setUser(res.data.user);
        nav('/');
        }catch(err){ alert(err.response?.data?.message || err.message); }
    };

    return (
        <form onSubmit={submit} className="max-w-sm mx-auto p-8 bg-white shadow-2xl rounded-xl space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">User Login</h2>

            {/* Username Input */}
            <div className="space-y-1">
                <label htmlFor="username" className="text-sm font-medium text-gray-700 block">Username</label>
                <input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition duration-150 ease-in-out"
                required
                />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 block">Password</label>
                <input
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition duration-150 ease-in-out"
                required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-[1.01]"
            >
                Login
            </button>
            </form>
                );
}
