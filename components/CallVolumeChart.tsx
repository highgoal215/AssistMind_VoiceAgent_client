"use client"

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface CallVolumeChartProps {
  timeRange: string
}

const CallVolumeChart = ({ timeRange }: CallVolumeChartProps) => {
  const data = {
    labels: ['06/19', '06/20', '06/21', '06/22', '06/23', '06/24', '06/25'],
    datasets: [
      {
        label: 'Call Volume',
        data: [15, 25, 35, 30, 55, 40, 20],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#3B82F6',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#374151',
        bodyColor: '#3B82F6',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: '600',
          family: 'Manrope, sans-serif',
        },
        bodyFont: {
          size: 14,
          weight: '700',
          family: 'Manrope, sans-serif',
        },
        callbacks: {
          title: (context: any) => {
            return context[0].label
          },
          label: (context: any) => {
            return `${context.parsed.y} calls`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#E5E7EB',
          borderColor: '#E5E7EB',
          borderDash: [3, 3],
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 14,
            family: 'Manrope, sans-serif',
          },
        },
        border: {
          display: false,
        },
      },
              y: {
          min: 0,
          max: 60,
          ticks: {
            stepSize: 15,
            color: '#6B7280',
            font: {
              size: 14,
              family: 'Manrope, sans-serif',
            },
            callback: function(value: any) {
              return value === 0 ? '00' : value.toString()
            },
          },
          grid: {
            color: '#E5E7EB',
            borderColor: '#E5E7EB',
            borderDash: [5, 5],
          },
          border: {
            display: false,
          },
        },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  }

  return (
    <div className="h-64 lg:h-80 w-full">
      <Line data={data} options={options as any} />
    </div>
  )
}

export default CallVolumeChart 