import React, { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import AuthContext from "../context/AuthContext";
import { Link } from 'react-router-dom';

export default function Dashboard(){
    const { user } = useContext(AuthContext);
    const [tasks,setTasks] = useState([]);

    const fetchTasks = async () => {
    const res = await API.get('/tasks');
    return res.data;
    };

    useEffect(() => {
        fetchTasks().then(data => setTasks(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
    {/* Header Section */}
    <header className="mb-8 border-b pb-4 flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
        👋 Welcome, {user?.username} (<span className="text-blue-600 capitalize">{user?.role}</span>)
        </h2>
        <Link
        to="/create"
        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 ease-in-out"
        >
        + Create Task
        </Link>
    </header>

    {/* Task List Section */}
    <section>
        {tasks.length > 0 ? (
        <ul className="space-y-4">
            {tasks.map(t => (
            <li
                key={t._id}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out border-l-4 border-blue-500"
            >
                <div className="flex justify-between items-start mb-2">
                <strong className="text-xl font-bold text-gray-800">{t.title}</strong>
                <span
                    className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                    t.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : t.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    } capitalize`}
                >
                    {t.status}
                </span>
                </div>

                <p className="text-gray-600 mb-4">{t.description}</p>

                <Link
                to={`/edit/${t._id}`}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-150 ease-in-out"
                >
                ✏️ Edit Task
                </Link>
            </li>
            ))}
        </ul>
        ) : (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg">
            <p className="text-gray-500 text-lg">No tasks found. Click "Create Task" to get started!</p>
        </div>
        )}
    </section>
    </div>
        );
}
