import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import Login from './pages/Login';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 max-w-md w-full text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Corporate Planner
          </h2>
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
    <div className="min-h-screen">
      {/* Premium Glassmorphism Header */}
      <header className="bg-white/60 backdrop-blur-xl sticky top-0 z-50 border-b border-white/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Corporate Planner
                </h1>
                <p className="text-sm text-gray-500 font-medium tracking-wide">Enterprise Task & Time Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-lg">{user?.email}</p>
                <p className="text-sm bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent font-semibold">
                  {user?.role?.replace('_', ' ') || 'Member'}
                </p>
              </div>
              <button 
                onClick={logout}
                className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white px-6 py-2.5 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard 
            icon="👥" 
            title="Team Members" 
            value="24" 
            change="+12%" 
            color="from-emerald-400 to-teal-500"
          />
          <MetricCard 
            icon="📋" 
            title="Active Tasks" 
            value="47" 
            change="+8" 
            color="from-blue-500 to-indigo-600"
          />
          <MetricCard 
            icon="⏱️" 
            title="This Week" 
            value="32h 45m" 
            change="+2h" 
            color="from-purple-500 to-violet-600"
          />
          <MetricCard 
            icon="✅" 
            title="Completed" 
            value="89%" 
            change="+5%" 
            color="from-orange-400 to-red-500"
          />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Clock In/Out Panel */}
          <div className="lg:col-span-1">
            <ClockPanel />
          </div>
          
          {/* Tasks Panel */}
          <div className="lg:col-span-2">
            <TasksPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ icon, title, value, change, color }) {
  return (
    <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/75">
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 bg-gradient-to-r {color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl">{icon}</span>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 font-medium">{title}</p>
    </div>
  );
}

function ClockPanel() {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl">
      <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center">
        <svg className="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Time Tracking
      </h2>
      <div className="space-y-4">
        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-6 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
          Clock In Now
        </button>
        <button className="w-full bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-gray-800 font-bold py-6 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg border-2 border-slate-200">
          Clocked Out
        </button>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-4xl font-black text-gray-900 mb-2">32h 45m</p>
        <p className="text-emerald-600 font-semibold text-lg">This Week</p>
      </div>
    </div>
  );
}

function TasksPanel() {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl h-[600px] overflow-hidden">
      <h2 className="text-2xl font-black text-gray-900 mb-6">Team Tasks</h2>
      <div className="space-y-4 mb-6">
        <TaskItem status="in-progress" title="Design Q1 Marketing Campaign" />
        <TaskItem status="todo" title="Review Q4 Financial Report" />
        <TaskItem status="completed" title="Setup New Employee Onboarding" />
      </div>
      <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
        + Add New Task
      </button>
    </div>
  );
}

function TaskItem({ status, title }) {
  const statusColors = {
    'todo': 'bg-gray-100 border-gray-200 text-gray-800',
    'in-progress': 'bg-blue-50 border-blue-200 text-blue-800',
    'completed': 'bg-emerald-50 border-emerald-200 text-emerald-800'
  };
  
  return (
    <div className={`p-4 rounded-2xl border-2 ${statusColors[status]} hover:shadow-md transition-all group`}>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{title}</h4>
        <div className={`w-3 h-3 rounded-full ${status === 'completed' ? 'bg-emerald-500' : status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
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
