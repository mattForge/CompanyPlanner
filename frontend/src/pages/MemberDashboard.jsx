import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MemberDashboard = () => {
  const [clockStatus, setClockStatus] = useState('out');
  const [weeklyHours, setWeeklyHours] = useState([
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 8.2 },
    { day: 'Thu', hours: 7.8 },
    { day: 'Fri', hours: 6.5 }
  ]);

  const handleClockIn = async () => {
    await fetch('/api/clock/in', { method: 'POST' });
    setClockStatus('in');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Clock Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Time Tracking</h2>
        <div className="flex gap-4 mb-8">
          <button
            onClick={handleClockIn}
            className={`px-8 py-3 rounded-xl font-semibold text-lg ${
              clockStatus === 'in'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all'
            }`}
          >
            {clockStatus === 'in' ? 'Clocked In' : 'Clock In'}
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
            Clock Out
          </button>
        </div>
      </div>

      {/* Weekly Hours Chart */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">This Week's Hours</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyHours}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemberDashboard;
