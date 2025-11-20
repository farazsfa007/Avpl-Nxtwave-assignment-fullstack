import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from "./context/AuthProvider";

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateEditTask from './pages/CreateEditTask';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css'

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateEditTask/></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><CreateEditTask/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
