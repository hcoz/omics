import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GeneChart = ({ geneData }) => {
  const labels = ['Rep1', 'Rep2', 'Rep3'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Experimental',
        data: [geneData.exper_rep1, geneData.exper_rep2, geneData.exper_rep3],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Control',
        data: [geneData.control_rep1, geneData.control_rep2, geneData.control_rep3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Expression Values for ${geneData.geneId}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Expression Level'
        }
      }
    }
  };

  return (
    <div className="gene-chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default GeneChart;
