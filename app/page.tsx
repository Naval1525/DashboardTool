'use client';

import { RiskOverview, ServicesChart, VulnerabilityAssessment } from '../components/Charts';
import { Shield, AlertTriangle, Activity } from 'lucide-react';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
              <p className="text-gray-400">Real-time security metrics and analysis</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-300">Current Risk Level</span>
              </div>
              <p className="text-2xl font-bold text-white mt-2">Medium (49/100)</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-blue-500" />
                <span className="text-gray-300">Active Alerts</span>
              </div>
              <p className="text-2xl font-bold text-white mt-2">0 Services Exposed</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">Security Coverage</span>
              </div>
              <p className="text-2xl font-bold text-white mt-2">10% Protected</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <RiskOverview />
          <ServicesChart />
          <VulnerabilityAssessment />
        </div>
      </div>
    </main>
  );
}
