"use client"

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const CallActivityChart = () => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Call Volume',
        data: [23, 37, 32, 18, 30, 38, 22],
        backgroundColor: 'rgba(139, 92, 246, 0.3)', // Light purple-blue
        borderColor: 'rgba(139, 92, 246, 0.3)',
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        order: 2,
      },
      {
        type: 'line' as const,
        label: 'Avg. Call Duration',
        data: [2.5, 3.2, 3.2, 3.5, 2.9, 3.1, 2.7],
        borderColor: '#4A48FF',
        backgroundColor: '#4A48FF',
        borderWidth: 2,
        pointBackgroundColor: '#4A48FF',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 5,
        tension: 0.4,
        order: 1,
        yAxisID: 'y1',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
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
          title: (context: any) => {
            return context[0].label
          },
          label: (context: any) => {
            if (context.dataset.type === 'bar') {
              return `Call: ${context.parsed.y}`
            } else if (context.dataset.type === 'line') {
              return `Min Avg: ${context.parsed.y}`
            }
            return ''
          },
          afterBody: (context: any) => {
            return 'Peak Hour: 10-11 pm'
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
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        min: 0,
        max: 40,
        ticks: {
          stepSize: 10,
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value === 0 ? '00' : value.toString()
          },
        },
        grid: {
          color: '#E5E7EB',
          borderColor: '#E5E7EB',
          borderDash: [3, 3],
        },
        border: {
          display: false,
        },
      },
      y1: {
        type: 'linear' as const,
        display: false,
        position: 'right' as const,
        min: 0,
        max: 4,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  return (
    <div className="h-64 lg:h-80 w-full">
      <Chart type="bar" data={data} options={options as any} />
    </div>
  )
}

export default CallActivityChart 