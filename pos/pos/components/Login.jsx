import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validUsers = {
    shantha: {
      password: 'shantha123',
      role: 'shopowner',
      dashboard: '/dashboard-2'
    },
    slone: {
      password: 'slone123',
      role: 'distributor',
      dashboard: '/dashboard-1'
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    setTimeout(() => {
      const user = validUsers[credentials.username.toLowerCase()];
      
      if (user && user.password === credentials.password) {
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('userRole', user.role);
        navigate(user.dashboard);
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
        <div className="w-full max-w-md px-4 py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 ease-in-out">
            
            <div className="flex justify-center mb-8">
              <div className="bg-blue-600 p-3 rounded-full shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
              Welcome Back
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center p-3 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>

              <div className="text-center text-sm text-gray-600 mt-4">
                <a href="#forgot-password" className="text-blue-600 hover:text-blue-800 font-medium">
                  Forgot password?
                </a>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#signup" className="text-blue-600 hover:text-blue-800 font-medium">
                Create one
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Animated Background */}
      <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-96 h-96 opacity-20">
            <circle cx="50" cy="50" r="15" className="fill-blue-400">
              <animate
                attributeName="r"
                values="15;10;15"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cx"
                values="50;55;50"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="150" cy="100" r="20" className="fill-purple-400">
              <animate
                attributeName="r"
                values="20;15;20"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values="100;95;100"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 relative">
            <div className="absolute inset-0 border-2 border-blue-300 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 -ml-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
            <div className="absolute inset-8 border-2 border-purple-300 rounded-full animate-spin-slow-reverse">
              <div className="absolute bottom-0 left-1/2 -ml-1 w-2 h-2 bg-purple-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full filter blur-xl opacity-30 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Login;