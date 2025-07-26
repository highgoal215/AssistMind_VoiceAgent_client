"use client"

import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Doughnut } from 'react-chartjs-2'

// Register chart components & plugins
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
)

const CallIntentChart = () => {
  const chartColors = ['#4A48FF', '#F36666', '#0EB770', '#FAA65D']

  const data = {
    labels: ['Appointments', 'Inquiries', 'Messages', 'Transfers'],
    datasets: [
      {
        data: [30, 45, 15, 10],
        backgroundColor: chartColors,
        borderWidth: 0,
        cutout: '60%',
      },
    ],
  }

  const options = {
    responsive: true,
    rotation: -Math.PI-50,
    // circumference: Math.PI * 2,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#6B7280',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 14,
          weight: '400',
        },
        callbacks: {
          title: (context: any) => context[0].label,
          label: (context: any) => {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((context.parsed / total) * 100).toFixed(1)
            return `${context.parsed} Calls (${percentage}%)`
          },
        },
      },
      datalabels: {
        color: '#ffffff',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value: number, context: any) => {
          const dataArr = context.chart.data.datasets[0].data;
          const total = dataArr.reduce((acc: number, cur: number) => acc + cur, 0);
          const percentage = ((value / total) * 100).toFixed(0);
          return `${percentage}%`;
        },
      },
    },
  }

  const legendData = [
    { name: 'Appointments', color: chartColors[0], value: 30, percentage: 30 },
    { name: 'Inquiries', color: chartColors[1], value: 45, percentage: 45 },
    { name: 'Messages', color: chartColors[2], value: 15, percentage: 15 },
    { name: 'Transfers', color: chartColors[3], value: 10, percentage: 10 },
  ]

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-80">
      {/* Chart Container */}
      <div className="flex-1 flex justify-center mb-6 lg:mb-0">
        <div className="w-48 h-48 sm:w-52 sm:h-52">
          <Doughnut data={data} options={options as any} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex-shrink-0 lg:ml-8 w-full lg:w-auto">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
          {legendData.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm lg:text-md">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700 font-manrope font-bold truncate">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CallIntentChart
