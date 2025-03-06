// Helper function for statistics calculations
function calculateStats(values) {
  if (!values.length) return null;

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  
  // Sort for median
  const sorted = [...values].sort((a, b) => a - b);
  const median = values.length % 2 === 0
    ? (sorted[values.length / 2 - 1] + sorted[values.length / 2]) / 2
    : sorted[Math.floor(values.length / 2)];

  // Calculate variance
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;

  return {
    mean: Number(mean.toFixed(4)),
    median: Number(median.toFixed(4)),
    variance: Number(variance.toFixed(4)),
    sampleSize: values.length
  };
}

module.exports = {
  calculateStats: calculateStats
};
