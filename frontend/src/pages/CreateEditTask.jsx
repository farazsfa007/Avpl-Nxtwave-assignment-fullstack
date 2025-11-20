import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

export default function CreateEditTask(){
  const { id } = useParams();
  const nav = useNavigate();
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [status,setStatus]=useState('pending');

  useEffect(()=>{
    if(!id) return;
    (async ()=>{
      const res = await API.get(`/tasks/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description || '');
      setStatus(res.data.status);
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/tasks/${id}`, { title, description, status });
      else await API.post('/tasks', { title, description, status });
      nav('/');
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-lg space-y-4 mt-25">
  <input
    value={title}
    onChange={e => setTitle(e.target.value)}
    placeholder="Title"
    required
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900"
  />

  <textarea
    value={description}
    onChange={e => setDescription(e.target.value)}
    placeholder="Description"
    rows="4"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 text-gray-900 resize-none"
  />

  <select
    value={status}
    onChange={e => setStatus(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
  >
    <option value="pending">Pending</option>
    <option value="in-progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>

  <button
    type="submit"
    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
  >
    {id ? 'Update' : 'Create'}
  </button>
</form>
  );
}
