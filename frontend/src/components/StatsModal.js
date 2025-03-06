import React from 'react';
import LineChart from './LineChart';
import BoxPlot from './BoxPlot';

const StatsModal = ({ statsData, onClose }) => {
  if (!statsData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Analysis for {statsData.geneId}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="charts-container">
          <div className="chart-wrapper">
            <h4>Expression Values Over Replicates</h4>
            <LineChart geneData={statsData.geneRawData} />
          </div>
          <div className="chart-wrapper">
            <h4>Distribution Analysis</h4>
            <BoxPlot statsData={statsData} />
          </div>
        </div>

        <div className="stats-tables">
          <div>
            <h4>Experimental Samples</h4>
            <table>
              <tbody>
                <tr><td>Mean</td><td>{statsData.experimental.mean}</td></tr>
                <tr><td>Median</td><td>{statsData.experimental.median}</td></tr>
                <tr><td>Variance</td><td>{statsData.experimental.variance}</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4>Control Samples</h4>
            <table>
              <tbody>
                <tr><td>Mean</td><td>{statsData.control.mean}</td></tr>
                <tr><td>Median</td><td>{statsData.control.median}</td></tr>
                <tr><td>Variance</td><td>{statsData.control.variance}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsModal; 
