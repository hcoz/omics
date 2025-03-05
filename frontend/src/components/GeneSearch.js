import React, { useState } from 'react';
import axios from 'axios';

const GeneSearch = () => {
  const [geneInput, setGeneInput] = useState('');
  const [geneData, setGeneData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const geneIDs = geneInput.split(/[\s,]+/).filter(id => id.trim());
    const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/expression`;

    try {
      const response = await axios.post(apiUrl, {
        geneIDs
      });
      setGeneData(response.data);
    } catch (err) {
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
                <th>Exp Rep1</th>
                <th>Exp Rep2</th>
                <th>Exp Rep3</th>
                <th>Ctrl Rep1</th>
                <th>Ctrl Rep2</th>
                <th>Ctrl Rep3</th>
              </tr>
            </thead>
            <tbody>
              {geneData.data.map((gene, index) => (
                <tr key={index}>
                  <td>{gene.gene}</td>
                  <td>{gene.transcript}</td>
                  <td>{gene.exper_rep1}</td>
                  <td>{gene.exper_rep2}</td>
                  <td>{gene.exper_rep3}</td>
                  <td>{gene.control_rep1}</td>
                  <td>{gene.control_rep2}</td>
                  <td>{gene.control_rep3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GeneSearch; 
