import React from 'react';
import GeneChart from './GeneChart';

const StatsModal = ({ statsData, onClose }) => {
  if (!statsData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Analysis for {statsData.geneId}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="chart-container">
          <GeneChart geneData={statsData.geneRawData} />
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
