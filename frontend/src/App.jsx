import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import MemberDashboard from './pages/MemberDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        {user?.role === 'GLOBAL_ADMIN' && <Route path="/admin" element={<AdminDashboard />} />}
        {user?.role === 'MEMBER' && <Route path="/member" element={<MemberDashboard />} />}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Corporate Planner</h1>
        <p className="text-xl text-gray-600 mt-2">Welcome, {user.firstName || user.email}</p>
      </header>
      {/* Role-specific dashboards */}
    </div>
  );
}

export default App;
