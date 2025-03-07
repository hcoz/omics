import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend
} from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  MatrixController,
  MatrixElement
);

const HeatmapModal = ({ geneData, onClose }) => {
  if (!geneData || geneData.length === 0) {
    return null;
  }

  const samples = Object.keys(geneData[0]).filter(key => key !== 'geneId' && key !== 'transcript');
  const matrixData = [];

  geneData.forEach((geneData, rowIndex) => {
    samples.forEach((sample, colIndex) => {
      matrixData.push({
        x: colIndex,
        y: rowIndex,
        v: geneData[sample]
      });
    });
  });

  const chartData = {
    datasets: [
      {
        label: 'Gene Expression Levels',
        data: matrixData,
        backgroundColor: (ctx) => {
          const value = ctx.dataset.data[ctx.dataIndex].v;
          return `rgba(255, ${255 - value * 5}, ${255 - value * 5}, 0.8)`;
        },
        borderWidth: 1,
      }
    ]
  };

  const handleClose = (e) => {
    // Close the modal only when the overlay or close button is clicked (not the modal itself)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Gene Expressions Heatmap</h3>
          <button className="close-button" onClick={handleClose}>&times;</button>
        </div>

        <div className="charts-container">
          <div className="chart-wrapper">
            <Chart type='matrix' data={chartData} options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Gene Expression Heatmap' },
                tooltip: {
                  callbacks: {
                    label: function (tooltipItem) {
                      return `Expression: ${tooltipItem.raw.v}`;
                    }
                  }
                }
              },
              scales: {
                x: { type: 'category', labels: samples },
                y: { type: 'category', labels: geneData.map(g => g.geneId) }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapModal;
