import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/DashBoard';  
import Home from './pages/Home';
// Your Dashboard component
// import NotFound from './pages/NotFound';    // 404 page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* Add this route */}
        {/* <Route path="*" element={<NotFound />} />             Catch-all route */}
      </Routes>
 </Router>
  );
};

export default App;
