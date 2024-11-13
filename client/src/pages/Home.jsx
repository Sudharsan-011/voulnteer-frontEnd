import React, { useState } from 'react';
import Signup from './Signup';  // Adjust the path if necessary
import Login from './Login';    // Adjust the path if necessary

const Home = () => {
  const [isLogin, setIsLogin] = useState(true); // True for Login, False for Signup

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg h-auto">
        {/* <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Welcome to the Home Page</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">This is the homepage of the application.</p> */}

        {/* Switch Bar */}
        <div className="flex justify-center space-x-8 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 ${isLogin ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-lg transition duration-200 hover:bg-blue-600`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 ${!isLogin ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-lg transition duration-200 hover:bg-green-600`}
          >
            Sign Up
          </button>
        </div>

        {/* Conditionally Render the Forms */}
        <div className="">
          {isLogin ? (
            <Login />
          ) : (
            <Signup />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
