import React from 'react';
import { motion } from 'framer-motion';

const algorithms = [
  { key: 'bubbleSort', name: 'Bubble', description: 'Simple comparison-based algorithm' },
  { key: 'selectionSort', name: 'Selection', description: 'Finds minimum element repeatedly' },
  { key: 'insertionSort', name: 'Insertion', description: 'Builds sorted array one element at a time' },
  { key: 'mergeSort', name: 'Merge', description: 'Divide and conquer approach' },
  { key: 'quickSort', name: 'Quick', description: 'Efficient divide and conquer' },
];

const ControlPanel = ({
  arraySize,
  setArraySize,
  speed,
  setSpeed,
  selectedAlgorithm,
  setSelectedAlgorithm,
  generateArray,
  startSorting,
  isRunning
}) => {
  return (
    <motion.div 
      className="control-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="controls-grid">
        <div className="control-group">
          <label className="control-label">
            Array Size: {arraySize}
          </label>
          <input
            type="range"
            min="10"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            className="slider"
            disabled={isRunning}
          />
        </div>
        
        <div className="control-group">
          <label className="control-label">
            Speed: {speed}%
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="slider"
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="algorithm-buttons">
        {algorithms.map((algo) => (
          <motion.button
            key={algo.key}
            className={`algorithm-btn ${selectedAlgorithm === algo.key ? 'active' : ''}`}
            onClick={() => setSelectedAlgorithm(algo.key)}
            disabled={isRunning}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title={algo.description}
          >
            {algo.name}
          </motion.button>
        ))}
      </div>

      <div className="action-buttons">
        <motion.button
          className="btn btn-secondary"
          onClick={generateArray}
          disabled={isRunning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Generate New Array
        </motion.button>
        
        <motion.button
          className="btn btn-primary"
          onClick={startSorting}
          disabled={isRunning}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isRunning ? 'Sorting...' : 'Start Sorting'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
