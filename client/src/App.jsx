import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Loader from './components/common/Loader.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

// Route-based code splitting: each page is only downloaded when visited
const Home = lazy(() => import('./pages/Home.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Loader label="Loading page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
