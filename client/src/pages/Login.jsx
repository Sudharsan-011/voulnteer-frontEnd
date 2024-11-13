import React, { useState } from 'react';
import { postData } from '../services/api';
import { useNavigate } from 'react-router-dom'; // For navigation after login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Hook to navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email and password fields are not empty
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password');
      return;
    }

    const data = { email, password };

    try {
      setIsLoading(true); // Set loading state before the request
      // Send login data to the server
      const response = await postData('/api/auth/login', data);

      if (response.token) {
        // Store token (or any other necessary data) in localStorage or context
        localStorage.setItem('token', response.token);

        // Redirect to dashboard or any other page after successful login
        navigate('/dashboard');
      }
    } catch (error) {
      // Display error message if login fails
      setErrorMessage(error.response?.data?.message || 'Login failed! Please check your credentials.');
    } finally {
      setIsLoading(false); // Reset loading state after the request
    }
  };

  return (
    <div className="flex justify-center items-center  bg-grey-100">
  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
    <form onSubmit={handleSubmit}>
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        className={`w-full p-3 text-white font-semibold rounded-md ${isLoading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} transition`}
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {errorMessage && <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>}
    </form>
  </div>
</div>
  );
};

export default Login;
