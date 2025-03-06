import React, { useState } from 'react';
import axios from 'axios';

const GeneSearch = () => {
  const [geneInput, setGeneInput] = useState('');
  const [geneData, setGeneData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async (geneId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/stats/${geneId}`);
      setStatsData(response.data);
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
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/expression`;

    try {
      const response = await axios.get(apiUrl, {
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
                    <button onClick={() => handleAnalyze(gene.geneId)}>
                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {statsData && (
        <div className="stats">
          <h3>Statistics for {statsData.geneId}</h3>
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
      )}
    </div>
  );
};

export default GeneSearch; 
