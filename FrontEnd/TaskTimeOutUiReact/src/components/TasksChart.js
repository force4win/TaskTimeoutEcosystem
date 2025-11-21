import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './TasksChart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const TasksChart = () => {
  const [tasks, setTasks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  // --- Configuración (equivalente a las propiedades del componente Angular) ---
  const doughnutCutout = '90%';
  const displayMode = 'days'; // 'percentage' o 'days'

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await taskService.getTasks();
        setTasks(response.data);
        processTasksForChart(response.data);
      } catch (error) {
        console.error('Failed to load tasks', error);
      }
    };
    loadTasks();
  }, []);

  const calculateTimeDifference = (startDateStr, dueDateStr) => {
    const start = new Date(startDateStr).getTime();
    const due = new Date(dueDateStr).getTime();
    const now = new Date().getTime();
    const total = due - start;

    if (now < start) {
      return { elapsed: 0, remaining: total, total };
    }
    if (now > due) {
      return { elapsed: total, remaining: 0, total };
    }
    const elapsed = now - start;
    const remaining = due - now;
    return { elapsed, remaining, total };
  };

  const formatMilliseconds = (ms) => {
    if (ms < 0) ms = 0;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0 && days === 0) result += `${minutes}m`;
    return result.trim() || '0m';
  };

  const processTasksForChart = (tasks) => {
    const data = tasks.map((task) => {
      const { elapsed, remaining } = calculateTimeDifference(
        task.startDate,
        task.dueDate
      );
      return {
        labels: ['Elapsed', 'Remaining'],
        datasets: [
          {
            data: [elapsed, remaining],
            backgroundColor: ['#E0E0E0', '#FF0000'],
            hoverBackgroundColor: ['#E0E0E0', '#FF0000'],
            borderWidth: 0,
          },
        ],
      };
    });
    setChartData(data);
  };

  const textCenterPlugin = {
    id: 'textCenter',
    afterDraw(chart) {
      if (chart.config.type === 'doughnut') {
        const ctx = chart.ctx;
        const { top, right, bottom, left, width, height } = chart.chartArea;
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;

        const data = chart.data.datasets[0].data;
        if (data && data.length > 1) {
          const elapsed = data[0];
          const remaining = data[1];
          const total = elapsed + remaining;
          if (total === 0) return;

          let text;
          if (displayMode === 'days') {
            const remainingDays = (remaining / (1000 * 60 * 60 * 24)).toFixed(0);
            text = `${remainingDays}d`;
          } else {
            const percentage = ((remaining / total) * 100).toFixed(0);
            text = `${percentage}%`;
          }

          ctx.save();
          ctx.font = `bold 30px Arial`;
          ctx.fillStyle = '#FF0000';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, centerX, centerY);
          ctx.restore();
        }
      }
    },
  };

  const options = {
    responsive: true,
    cutout: doughnutCutout,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            const formattedValue = formatMilliseconds(value);
            return `${label}: ${formattedValue}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="header">
        <h2>Task Time Distribution</h2>
        <button onClick={() => navigate('/tasks')}>Go Back to Tasks</button>
      </div>
      <div className="charts-grid">
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <div key={task.id} className="chart-item">
              <h3>{task.description}</h3>
              {chartData[i] && (
                <Doughnut
                  data={chartData[i]}
                  options={options}
                  plugins={[textCenterPlugin]}
                />
              )}
            </div>
          ))
        ) : (
          <p>No tasks available to display in chart.</p>
        )}
      </div>
    </div>
  );
};

export default TasksChart;
