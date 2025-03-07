import React from 'react';
import LineChart from './LineChart';
import BoxPlot from './BoxPlot';

const StatsModal = ({ mode, onClose, statsData, anomalyData }) => {
  if ((mode === 'anomaly' && !anomalyData) || (mode === 'stats' && !statsData)) {
    return null;
  };

  const geneId = mode === 'stats' ? statsData.geneId : anomalyData.geneId;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Analysis for {geneId}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="charts-container">
          <div className="chart-wrapper">
            {mode === 'stats' && (
              <LineChart geneData={statsData.geneRawData} />
            )}
            {mode === 'anomaly' && (
              <BoxPlot statsData={anomalyData} />
            )}
          </div>
        </div>

        {mode === 'stats' && (
          <div className="stats-tables">
            <div>
              <h4>Experimental Stats</h4>
              <table>
                <tbody>
                  <tr><td>Mean</td><td>{statsData.experimental.mean}</td></tr>
                  <tr><td>Median</td><td>{statsData.experimental.median}</td></tr>
                  <tr><td>Variance</td><td>{statsData.experimental.variance}</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4>Control Stats</h4>
              <table>
                <tbody>
                  <tr><td>Mean</td><td>{statsData.control.mean}</td></tr>
                  <tr><td>Median</td><td>{statsData.control.median}</td></tr>
                  <tr><td>Variance</td><td>{statsData.control.variance}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {mode === 'anomaly' && (
          <div className="stats-tables">
            <div>
              <h4>Stats</h4>
              <table>
                <tbody>
                  <tr><td>Mean</td><td>{anomalyData.values.mean}</td></tr>
                  <tr><td>Median</td><td>{anomalyData.values.median}</td></tr>
                  <tr><td>Variance</td><td>{anomalyData.values.variance}</td></tr>
                  <tr><td>IQR</td><td>{anomalyData.values.iqr}</td></tr>
                  <tr><td>Max</td><td>{anomalyData.values.max}</td></tr>
                  <tr><td>Min</td><td>{anomalyData.values.min}</td></tr>
                  <tr><td>Q1</td><td>{anomalyData.values.q1}</td></tr>
                  <tr><td>Q3</td><td>{anomalyData.values.q3}</td></tr>
                  <tr><td>Outliers</td><td>{anomalyData.values.outliers.join(', ')}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsModal; 
