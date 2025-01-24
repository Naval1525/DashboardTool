import { BarChart, LineChart, PieChart, RadarChart, ScatterChart } from '@/components/Charts';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Bar Chart</h2>
            <p className="text-gray-400 mb-4">Comparing quarterly performance between years using grouped bars</p>
            <BarChart />
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Line Chart</h2>
            <p className="text-gray-400 mb-4">Tracking revenue and profit trends over time with smooth curves</p>
            <LineChart />
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Pie Chart</h2>
            <p className="text-gray-400 mb-4">Distribution of sales across different channels with percentage breakdown</p>
            <PieChart />
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Radar Chart</h2>
            <p className="text-gray-400 mb-4">Multi-dimensional comparison of budget allocation vs actual spending</p>
            <RadarChart />
          </div>

          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-100">Scatter Chart</h2>
            <p className="text-gray-400 mb-4">Correlation between revenue and profit with dynamic point sizing</p>
            <ScatterChart />
          </div>
        </div>
      </div>
    </main>
  );
}