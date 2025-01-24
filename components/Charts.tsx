'use client';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { EChartsOption } from 'echarts';

const useChart = (options: EChartsOption) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  useEffect(() => {
    if (!chartRef.current) return;
    try {
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(options);
      const handleResize = () => chartInstance.current?.resize();
      window.addEventListener('resize', handleResize);
      return () => {
        chartInstance.current?.dispose();
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  }, [options]);

  return chartRef;
};

const servicesData = [
  { date: '12-26', services: 1, ips: 1 },
  { date: '12-28', services: 1, ips: 1 },
  { date: '12-30', services: 1, ips: 1 },
  { date: '01-01', services: 0, ips: 0 },
  { date: '01-03', services: 0, ips: 0 },
  { date: '01-05', services: 0, ips: 0 }
];

const assessmentData = [
  { name: 'Endpoint Sensor', count: 16, percentage: 7.7 },
  { name: 'Trend Cloud One - Endpoint & Workload Security', count: 6, percentage: 2.9 },
  { name: 'Standard Endpoint Protection', count: 7, percentage: 3.3 },
  { name: 'Server & Workload Protection', count: 3, percentage: 1.4 },
  { name: 'Third party device data', count: 0, percentage: 0 }
];

export const RiskOverview = () => {
  const data = Array.from({ length: 180 }, (_, i) => ({
    date: new Date(2024, 7 + Math.floor(i / 30), i % 30).toISOString(),
    value: 40 + Math.random() * 20
  }));

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-xl shadow-xl">
      <div className="flex items-center gap-6 mb-8">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <h2 className="text-3xl font-bold text-yellow-400">49</h2>
          <p className="text-sm text-yellow-400/80">Medium risk</p>
        </div>
        <div className="text-3xl text-gray-400 font-light">/100</div>
      </div>

      <div className="mb-8">
        <button className="bg-gray-800/80 px-6 py-2 rounded-lg text-sm hover:bg-gray-700/80 transition-colors">
          Cyber Risk Subindexes
        </button>
      </div>

      <div className="space-y-3 mb-8">
        {[
          { color: 'bg-purple-400', label: 'Exposure', value: 'Medium' },
          { color: 'bg-blue-400', label: 'Attack', value: 'Medium' },
          { color: 'bg-pink-400', label: 'Security Configuration', value: 'Medium' }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3 bg-gray-800/30 p-3 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
            <span className="text-gray-300">{item.label}: </span>
            <span className="text-yellow-400 font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" tick={false} axisLine={{ stroke: '#4B5563' }} />
            <YAxis domain={[0, 100]} axisLine={{ stroke: '#4B5563' }} tick={{ fill: '#9CA3AF' }} />
            <Line type="monotone" dataKey="value" stroke="#F3F4F6" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ServicesChart = () => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-xl shadow-xl">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-lg font-medium text-gray-200">UNEXPECTED INTERNET-FACING SERVICES/PORTS</h2>
      <button className="px-6 py-2 text-sm bg-gray-800/80 rounded-lg hover:bg-gray-700/80 transition-colors">View Details</button>
    </div>

    <div className="grid grid-cols-2 gap-8 mb-8">
      <div className="bg-gray-800/30 p-4 rounded-lg">
        <div className="text-4xl font-light mb-2">0</div>
        <div className="text-sm text-gray-400">Unique unexpected services/ports</div>
      </div>
      <div className="bg-gray-800/30 p-4 rounded-lg">
        <div className="text-4xl font-light mb-2">0</div>
        <div className="text-sm text-gray-400">Total public IPs affected</div>
      </div>
    </div>

    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={servicesData}>
          <XAxis dataKey="date" stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
          <YAxis domain={[0, 1.2]} ticks={[0, 0.4, 0.8, 1.2]} stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} itemStyle={{ color: '#F3F4F6' }} />
          <Line type="linear" dataKey="services" stroke="#F3F4F6" dot={{ fill: '#F3F4F6', r: 4 }} />
          <Line type="linear" dataKey="ips" stroke="#60A5FA" dot={{ fill: '#60A5FA', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const VulnerabilityAssessment = () => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-xl shadow-xl">
    <div className="flex justify-between items-start mb-8">
      <h2 className="text-lg font-medium text-gray-200">VULNERABILITY ASSESSMENT COVERAGE (WINDOWS AND LINUX ENDPOINTS)</h2>
    </div>

    <div className="text-sm text-gray-400 mb-6">Last assessment: 2025-01-09</div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-blue-400 mb-4">
            <span className="font-medium">Assessment visibility (21)</span>
            <span className="text-xs bg-gray-800/50 px-2 py-1 rounded-full">ⓘ</span>
          </div>
          {assessmentData.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-3 text-sm bg-gray-800/30 p-3 rounded-lg">
              <span className="text-gray-300">{item.name}</span>
              <div className="flex gap-8">
                <span className="text-gray-200">{item.count}</span>
                <span className="w-12 text-right text-blue-400">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="#1F2937" strokeWidth="16" fill="none" />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#60A5FA"
              strokeWidth="16"
              fill="none"
              strokeDasharray={`${0.1 * 2 * Math.PI * 88} ${2 * Math.PI * 88}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gray-800/30 rounded-full">
            <div className="text-4xl text-yellow-400 font-bold mb-1">10%</div>
            <div className="text-sm text-gray-400 mb-2">21 / 209</div>
            <div className="flex items-center gap-2 text-sm bg-yellow-400/10 px-3 py-1 rounded-full">
              <span className="text-yellow-400">⚠</span>
              <span className="text-yellow-400">Low coverage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
