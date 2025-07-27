import React from 'react';
import { motion } from 'framer-motion';

const complexityData = {
  bubbleSort: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    stable: true,
    inPlace: true
  },
  selectionSort: {
    time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    stable: false,
    inPlace: true
  },
  insertionSort: {
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    stable: true,
    inPlace: true
  },
  mergeSort: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(n)',
    stable: true,
    inPlace: false
  },
  quickSort: {
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    space: 'O(log n)',
    stable: false,
    inPlace: true
  }
};

const ComplexityInfo = ({ algorithm }) => {
  const data = complexityData[algorithm];

  if (!data) return null;

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h3>Algorithm Analysis</h3>
      
      <div className="complexity-section">
        <h4 style={{ color: 'var(--accent-color)', marginBottom: '0.75rem', fontSize: '1rem' }}>
          Time Complexity
        </h4>
        <div className="complexity-item">
          <span className="complexity-label">Best Case:</span>
          <span className="complexity-value">{data.time.best}</span>
        </div>
        <div className="complexity-item">
          <span className="complexity-label">Average Case:</span>
          <span className="complexity-value">{data.time.average}</span>
        </div>
        <div className="complexity-item">
          <span className="complexity-label">Worst Case:</span>
          <span className="complexity-value">{data.time.worst}</span>
        </div>
      </div>

      <div className="complexity-section" style={{ marginTop: '1rem' }}>
        <h4 style={{ color: 'var(--accent-color)', marginBottom: '0.75rem', fontSize: '1rem' }}>
          Space Complexity
        </h4>
        <div className="complexity-item">
          <span className="complexity-label">Space:</span>
          <span className="complexity-value">{data.space}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ComplexityInfo;
