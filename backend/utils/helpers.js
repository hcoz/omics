// Round numbers to 2 decimal places
const roundNumber = (num) => {
  return Math.round(num * 100) / 100;
};

// Helper function for statistics calculations
const calculateStats = (values) => {
  if (!values || values.length === 0) return null;

  // Sort values for calculations
  const sorted = [...values].sort((a, b) => a - b);
  
  // Calculate variance
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;

  // Calculate quartiles and IQR
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  
  // Define outlier boundaries
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  // Identify outliers
  const outliers = values.filter(v => v < lowerBound || v > upperBound);

  return {
    mean: roundNumber(mean),
    median: sorted[Math.floor(sorted.length / 2)],
    variance: roundNumber(variance),
    q1: roundNumber(q1),
    q3: roundNumber(q3),
    iqr: roundNumber(iqr),
    outliers,
    min: sorted[0],
    max: sorted[sorted.length - 1]
  };
};

module.exports = { calculateStats };
