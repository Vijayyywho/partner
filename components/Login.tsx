import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USERS } from '../constants';
import { KpmFullLogo } from './icons';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = MOCK_USERS.find(u => u.email === email);

    // In a real app, you'd also verify the password
    if (user && password) {
      onLogin(user);
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
           <KpmFullLogo />
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="text-sm font-medium text-slate-600">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-slate-600">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <a href="#" className="font-medium text-cyan-600 hover:text-cyan-500">
              Forgot your password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Sign in
            </button>
          </div>
        </form>
         <div className="text-xs text-slate-400 bg-slate-50 p-3 rounded-lg text-center">
            <p className="font-semibold">Demo Credentials:</p>
            <p>Admin: <span className="font-mono">admin@kpm.com</span></p>
            <p>Client 1: <span className="font-mono">client@example.com</span></p>
            <p>Client 2: <span className="font-mono">jane@acme.com</span></p>
            <p>(Any password will work)</p>
          </div>
      </div>
    </div>
  );
};

export default Login;