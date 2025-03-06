import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from 'chart.js';
import { Chart as BoxPlotChart } from 'react-chartjs-2';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';

ChartJS.register(
  BoxPlotController,
  BoxAndWiskers,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

const BoxPlot = ({ statsData }) => {
  const { experimental, control, geneRawData } = statsData;

  const experimentalData = [
    geneRawData.exper_rep1,
    geneRawData.exper_rep2,
    geneRawData.exper_rep3
  ].filter(val => val !== null);

  const controlData = [
    geneRawData.control_rep1,
    geneRawData.control_rep2,
    geneRawData.control_rep3
  ].filter(val => val !== null);

  const data = {
    labels: ['Experimental', 'Control'],
    datasets: [{
      label: 'Expression Values',
      backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
      borderColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
      borderWidth: 1,
      outlierColor: '#ff0000',
      itemRadius: 4,
      outlierRadius: 6,
      // data: [experimentalData, controlData]
      data: [
        {
          min: experimental.min,
          q1: experimental.q1,
          median: experimental.median,
          q3: experimental.q3,
          max: experimental.max,
          mean: experimental.mean,
          outliers: experimental.outliers,
          items: experimentalData
        },
        {
          min: control.min,
          q1: control.q1,
          median: control.median,
          q3: control.q3,
          max: control.max,
          mean: control.mean,
          outliers: control.outliers,
          items: controlData
        }
      ]
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Distribution of Expression Values'
      }
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
    <div className="box-plot">
      <BoxPlotChart type="boxplot" data={data} options={options} />
    </div>
  );
};

export default BoxPlot; 
