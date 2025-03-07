import React, { useState } from 'react';
import axios from 'axios';
import StatsModal from './StatsModal';
import HeatmapModal from './HeatmapModal';

const GeneSearch = () => {
  const [geneInput, setGeneInput] = useState('');
  const [geneData, setGeneData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [anomalyData, setAnomalyData] = useState(null);
  const [statsMode, setStatsMode] = useState('stats');
  const [displayStats, setDisplayStats] = useState(false);
  const [displayHeatmap, setDisplayHeatmap] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (geneId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stats/${geneId}`);
      const geneRawData = geneData.data.find(gene => gene.geneId === geneId);

      setStatsData({ ...response.data, geneRawData });
      setStatsMode('stats');
      setDisplayStats(true);
    } catch (err) {
      console.error('Error analyzing gene:', err);
      setError(err.response?.data?.error || 'Analysis failed');
    }
  };

  const handleAnomaly = async (geneId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/anomaly/${geneId}`);
      const geneRawData = geneData.data.find(gene => gene.geneId === geneId);

      setAnomalyData({ ...response.data, geneRawData });
      setStatsMode('anomaly');
      setDisplayStats(true);
    } catch (err) {
      console.error('Error analyzing gene:', err);
      setError(err.response?.data?.error || 'Analysis failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const geneIDs = geneInput.split(/[\s,]+/).filter(id => id.trim());

    if (geneIDs.length === 0) {
      setError('Please enter at least one gene ID');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/expression`, {
        params: { geneIDs }
      });
      setGeneData(response.data);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gene-search">
      <form onSubmit={handleSubmit}>
        <textarea
          value={geneInput}
          onChange={(e) => setGeneInput(e.target.value)}
          placeholder="Enter gene IDs (separated by commas or newlines)"
          rows={4}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {geneData && (
        <div className="results">
          <h3>Results</h3>
          <button className="action" onClick={() => setDisplayHeatmap(true)}>Display Heatmap</button>
          {geneData.warning && <p className="warning">{geneData.warning}</p>}
          <table>
            <thead>
              <tr>
                <th>Gene</th>
                <th>Transcript</th>
                <th>Exper Rep1</th>
                <th>Exper Rep2</th>
                <th>Exper Rep3</th>
                <th>Control Rep1</th>
                <th>Control Rep2</th>
                <th>Control Rep3</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {geneData.data.map((gene, index) => (
                <tr key={index}>
                  <td>{gene.geneId}</td>
                  <td>{gene.transcript}</td>
                  <td>{gene.exper_rep1}</td>
                  <td>{gene.exper_rep2}</td>
                  <td>{gene.exper_rep3}</td>
                  <td>{gene.control_rep1}</td>
                  <td>{gene.control_rep2}</td>
                  <td>{gene.control_rep3}</td>
                  <td>
                    <button className="action" onClick={() => handleAnalyze(gene.geneId)}>
                      Analyze
                    </button>
                    <button className="action" onClick={() => handleAnomaly(gene.geneId)}>
                      Anomaly
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {displayStats && (
        <StatsModal
          mode={statsMode}
          onClose={() => setDisplayStats(false)}
          statsData={statsData}
          anomalyData={anomalyData}
        />
      )}
      {displayHeatmap && (
        <HeatmapModal geneData={geneData.data} onClose={() => setDisplayHeatmap(false)} />
      )}
    </div>
  );
};

export default GeneSearch; 
