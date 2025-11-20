import React, { useState, useContext } from 'react';
import API from '../services/api';
import AuthContext from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role

  const { setUser, setToken } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', {
        username,
        password,
        role,  // sending selected role
      });

      setToken(res.data.token);
      setUser(res.data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-8 bg-white shadow-xl rounded-2xl space-y-6 mt-25">
  <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Create Account</h2>

  {/* Username Input */}
  <div>
    <label htmlFor="reg-username" className="text-sm font-medium text-gray-700 block mb-1">Username</label>
    <input
      id="reg-username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Choose a username"
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900 transition duration-150 ease-in-out"
    />
  </div>

  {/* Password Input */}
  <div>
    <label htmlFor="reg-password" className="text-sm font-medium text-gray-700 block mb-1">Password</label>
    <input
      id="reg-password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      type="password"
      placeholder="Create a strong password"
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-gray-900 transition duration-150 ease-in-out"
    />
  </div>

  {/* ROLE DROPDOWN */}
  <div>
    <label htmlFor="reg-role" className="text-sm font-medium text-gray-700 block mb-1">Account Type</label>
    <div className="relative">
      <select
        id="reg-role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-purple-500 focus:border-purple-500 text-gray-900 transition duration-150 ease-in-out pr-10"
      >
        <option value="user">Register as User</option>
        <option value="admin">Register as Admin</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        {/* Simple Down Arrow Icon */}
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full py-3 px-4 bg-purple-600 text-white font-bold rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-[1.01]"
  >
    Register
  </button>
</form>
  );
}
