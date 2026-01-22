import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import Login from './pages/Login';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Corporate Planner
            </h1>
            <p className="text-xl text-gray-600 mt-2">Welcome back, {user?.email}</p>
            <p className="text-lg text-gray-500 mt-1">Role: <span className="font-semibold text-blue-600 capitalize">{user?.role || 'MEMBER'}</span></p>
          </div>
          <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-all"
          >
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-400 to-green-500 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Clock In/Out</h3>
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Start Work
            </button>
          </div>
          <div className="bg-blue-500 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Team Tasks</h3>
            <p className="text-blue-100">0 tasks assigned</p>
          </div>
          <div className="bg-purple-500 p-6 rounded-xl text-white shadow-lg">
            <h3 className="text-xl font-semibold mb-2">This Week</h3>
            <p className="text-purple-100">24 hours tracked</p>
          </div>
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
