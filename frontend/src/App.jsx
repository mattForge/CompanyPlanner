import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import MemberDashboard from './pages/MemberDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        {user?.role === 'GLOBAL_ADMIN' && <Route path="/admin" element={<AdminDashboard />} />}
        {user?.role === 'MEMBER' && <Route path="/member" element={<MemberDashboard />} />}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
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
        <p className="text-lg text-gray-500">Role: <span className="font-semibold capitalize">{user.role}</span></p>
      </header>
      {/* Role-specific dashboards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Team</h3>
          <p className="text-gray-600">{user.team?.name || 'No team assigned'}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Company</h3>
          <p className="text-gray-600">{user.company?.name || 'N/A'}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Clock In/Out
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
