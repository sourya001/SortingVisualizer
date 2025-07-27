import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import ArrayBar from './components/ArrayBar';
import ControlPanel from './components/ControlPanel';
import ComplexityInfo from './components/ComplexityInfo';
import StatsPanel from './components/StatsPanel';
import * as sortingAlgorithms from './algorithms';

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const debounceRef = useRef(null);

  // Generate random array
  const generateArray = useCallback(() => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 400) + 10,
        id: i,
        isComparing: false,
        isSwapping: false,
        isSorted: false,
        isPivot: false
      });
    }
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
    setIsSorted(false);
  }, [arraySize]);

  // Smooth array size transition without layout shift
  const adjustArraySize = useCallback((newSize) => {
    setArray(currentArray => {
      const updatedArray = [...currentArray];
      
      if (newSize > updatedArray.length) {
        // Add new elements
        for (let i = updatedArray.length; i < newSize; i++) {
          updatedArray.push({
            value: Math.floor(Math.random() * 400) + 10,
            id: i,
            isComparing: false,
            isSwapping: false,
            isSorted: false,
            isPivot: false
          });
        }
      } else if (newSize < updatedArray.length) {
        // Remove elements from the end
        updatedArray.splice(newSize);
      }
      
      return updatedArray;
    });
    
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
    setIsSorted(false);
  }, []); // No dependencies needed now

  // Initialize array on mount
  useEffect(() => {
    generateArray();
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Manual generate array function (immediate, no debounce)
  const handleGenerateArray = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    generateArray();
  }, [generateArray]);

  // Handle array size change from slider
  const handleArraySizeChange = useCallback((newSize) => {
    setArraySize(newSize);
    if (!isRunning) {
      // Immediate adjustment for better responsiveness
      adjustArraySize(newSize);
    }
  }, [adjustArraySize, isRunning]);

  // Animation delay based on speed
  const getDelay = () => {
    return Math.max(1, 101 - speed);
  };

  // Update array with animation
  const updateArray = (newArray, delay = getDelay()) => {
    return new Promise(resolve => {
      setTimeout(() => {
        setArray([...newArray]);
        resolve();
      }, delay);
    });
  };

  // Start sorting
  const startSorting = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setComparisons(0);
    setSwaps(0);
    setTimeElapsed(0);
    
    const startTime = Date.now();
    const timer = setInterval(() => {
      setTimeElapsed(Date.now() - startTime);
    }, 10);

    try {
      const algorithm = sortingAlgorithms[selectedAlgorithm];
      await algorithm(array, updateArray, setComparisons, setSwaps);
      setIsSorted(true);
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      clearInterval(timer);
      setIsRunning(false);
    }
  };

  return (
    <div className="app">
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="app-title">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Sorting Visualizer
          </motion.span>
        </h1>
      </motion.header>

      <div className="app-content">
        {/* Top Section - Controller Only */}
        <div className="controller-section">
          <ControlPanel
            arraySize={arraySize}
            setArraySize={handleArraySizeChange}
            speed={speed}
            setSpeed={setSpeed}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            generateArray={handleGenerateArray}
            startSorting={startSorting}
            isRunning={isRunning}
          />
        </div>

        {/* Main Section - Algorithm Analysis, Graph, Statistics */}
        <div className="main-section">
          <div className="analysis-panel">
            <ComplexityInfo algorithm={selectedAlgorithm} />
          </div>

          <div className="graph-panel">
            <div className="array-container-wrapper">
              <div className="array-container">
                <ArrayBar array={array} />
              </div>
            </div>
          </div>

          <div className="stats-panel">
            <StatsPanel 
              comparisons={comparisons}
              swaps={swaps}
              timeElapsed={timeElapsed}
              arraySize={arraySize}
              isSorted={isSorted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
