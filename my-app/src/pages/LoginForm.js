import React, { useState } from 'react';

// Login Form Component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Clear previous messages

    // Simulate API call for login
    // In a real application, you would use fetch or axios here
    console.log('Login attempt:', { email, password });

    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple validation for demonstration
      if (email === 'test@example.com' && password === 'password123') {
        setMessage({ text: 'Login successful!', type: 'success' });
        setEmail('');
        setPassword('');
      } else {
        setMessage({ text: 'Invalid email or password.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'An error occurred during login.', type: 'error' });
      console.error('Login error:', error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {message.text && (
        <div
          className={`px-4 py-3 rounded-md text-sm ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
