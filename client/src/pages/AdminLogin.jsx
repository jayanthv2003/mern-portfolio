import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiLock } from 'react-icons/fi';
import useAuth from '../hooks/useAuth.js';
import SEO from '../components/common/SEO.jsx';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-transparent border border-border-light dark:border-border-dark rounded-md px-3 py-2.5 text-sm outline-none focus:border-signal transition-colors';

  return (
    <>
      <SEO title="Admin Login | Jayanth" description="Admin dashboard login." />
      <div className="min-h-screen flex items-center justify-center container-px">
        <form onSubmit={handleSubmit} className="card w-full max-w-sm p-8">
          <div className="flex items-center gap-2 mb-6">
            <FiLock className="text-signal" />
            <h1 className="font-display font-semibold text-xl">Admin Login</h1>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full justify-center mt-6 disabled:opacity-60"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLogin;
