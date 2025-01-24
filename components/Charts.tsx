'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

// Custom hook for chart initialization
const useChart = (options: EChartsOption) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts>();

  useEffect(() => {
    if (!chartRef.current) return;
    chartInstance.current = echarts.init(chartRef.current, 'dark');
    chartInstance.current.setOption(options);
    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      chartInstance.current?.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [options]);

  return chartRef;
};

export const BarChart: React.FC = () => {
  const options: EChartsOption = {
    backgroundColor: '#1a1a1a',
    tooltip: { trigger: 'axis' },
    grid: { containLabel: true },
    legend: {
      data: ['2023', '2024'],
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4'],
      axisLabel: { rotate: 45, color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' }
    },
    series: [
      {
        name: '2023',
        type: 'bar',
        data: [120, 200, 150, 180],
        itemStyle: { color: '#FF6B6B' }
      },
      {
        name: '2024',
        type: 'bar',
        data: [140, 230, 170, 210],
        itemStyle: { color: '#4ECDC4' }
      }
    ]
  };

  const chartRef = useChart(options);
  return <div ref={chartRef} className="w-full h-64 md:h-96" />;
};

export const LineChart: React.FC = () => {
  const options: EChartsOption = {
    backgroundColor: '#1a1a1a',
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['Revenue', 'Profit'],
      textStyle: { color: '#fff' }
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' }
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330],
        smooth: true,
        itemStyle: { color: '#FF0099' }
      },
      {
        name: 'Profit',
        type: 'line',
        data: [320, 432, 501, 634, 890, 930],
        smooth: true,
        itemStyle: { color: '#00F5D4' }
      }
    ]
  };

  const chartRef = useChart(options);
  return <div ref={chartRef} className="w-full h-64 md:h-96" />;
};

export const PieChart: React.FC = () => {
  const options: EChartsOption = {
    backgroundColor: '#1a1a1a',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: { color: '#fff' }
    },
    series: [
      {
        name: 'Sales Distribution',
        type: 'pie',
        radius: '70%',
        data: [
          { value: 1048, name: 'Online', itemStyle: { color: '#FF0099' } },
          { value: 735, name: 'Retail', itemStyle: { color: '#FF6B6B' } },
          { value: 580, name: 'Partners', itemStyle: { color: '#FF9F43' } },
          { value: 484, name: 'Others', itemStyle: { color: '#00F5D4' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const chartRef = useChart(options);
  return <div ref={chartRef} className="w-full h-64 md:h-96" />;
};

export const RadarChart: React.FC = () => {
  const options: EChartsOption = {
    backgroundColor: '#1a1a1a',
    tooltip: {},
    legend: {
      data: ['Allocated', 'Actual'],
      textStyle: { color: '#fff' }
    },
    radar: {
      indicator: [
        { name: 'Sales', max: 100 },
        { name: 'Marketing', max: 100 },
        { name: 'Development', max: 100 },
        { name: 'Support', max: 100 },
        { name: 'Operations', max: 100 }
      ],
      axisName: { color: '#fff' },
      splitArea: { show: false },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [80, 70, 90, 85, 75],
          name: 'Allocated',
          itemStyle: { color: '#FF9F43' },
          areaStyle: { opacity: 0.3 }
        },
        {
          value: [85, 65, 88, 90, 70],
          name: 'Actual',
          itemStyle: { color: '#00F5D4' },
          areaStyle: { opacity: 0.3 }
        }
      ]
    }]
  };

  const chartRef = useChart(options);
  return <div ref={chartRef} className="w-full h-64 md:h-96" />;
};

export const ScatterChart: React.FC = () => {
  const options: EChartsOption = {
    backgroundColor: '#1a1a1a',
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        return `Revenue: ${params.data[0]}<br/>Profit: ${params.data[1]}`;
      }
    },
    xAxis: {
      type: 'value',
      name: 'Revenue (K)',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { color: '#fff' },
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      type: 'value',
      name: 'Profit (K)',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { color: '#fff' },
      axisLabel: { color: '#fff' }
    },
    series: [{
      type: 'scatter',
      data: [
        [28, 8], [55, 12], [43, 15], [91, 28],
        [81, 25], [53, 17], [19, 5], [87, 29]
      ],
      symbolSize: function (data: any) {
        return Math.sqrt(data[0]) * 1.5;
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#FF0099' },
          { offset: 1, color: '#00F5D4' }
        ])
      }
    }]
  };

  const chartRef = useChart(options);
  return <div ref={chartRef} className="w-full h-64 md:h-96" />;
};