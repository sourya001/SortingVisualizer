import React from 'react';
import { motion } from 'framer-motion';

const StatsPanel = ({ 
  comparisons, 
  swaps, 
  timeElapsed, 
  arraySize, 
  isSorted 
}) => {
  const formatTime = (milliseconds) => {
    if (milliseconds < 1000) {
      return `${milliseconds}ms`;
    }
    return `${(milliseconds / 1000).toFixed(2)}s`;
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h3>Statistics</h3>
      
      <div className="stats-grid">
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="stat-value">{formatNumber(comparisons)}</span>
          <span className="stat-label">Comparisons</span>
        </motion.div>
        
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="stat-value">{formatNumber(swaps)}</span>
          <span className="stat-label">Swaps</span>
        </motion.div>
        
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="stat-value">{formatTime(timeElapsed)}</span>
          <span className="stat-label">Time</span>
        </motion.div>
        
        <motion.div 
          className="stat-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="stat-value">{arraySize}</span>
          <span className="stat-label">Array Size</span>
        </motion.div>
      </div>

      {isSorted && (
        <motion.div
          className="sorted-indicator"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'linear-gradient(45deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.2))',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            borderRadius: '8px',
            textAlign: 'center',
            color: 'var(--success-color)',
            fontWeight: 'bold'
          }}
        >
          ✅ Array Sorted Successfully!
        </motion.div>
      )}
    </motion.div>
  );
};

export default StatsPanel;
