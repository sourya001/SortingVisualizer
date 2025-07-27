import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ArrayBar = ({ array }) => {
  const [containerWidth, setContainerWidth] = useState(800);
  const wrapperRef = useRef(null);
  
  const maxValue = Math.max(...array.map(item => item.value));
  const containerHeight = 350;

  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth;
        setContainerWidth(width - 20); // Account for padding
      }
    };

    updateWidth();
    const resizeObserver = new ResizeObserver(updateWidth);
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);

  const { barWidth, gap } = useMemo(() => {
    const availableWidth = containerWidth;
    const gapSize = array.length > 100 ? 0 : 1;
    const totalGaps = (array.length - 1) * gapSize;
    const calculatedWidth = Math.max((availableWidth - totalGaps) / array.length, 1);
    
    let maxWidth;
    if (array.length <= 20) maxWidth = 50;
    else if (array.length <= 50) maxWidth = 30;
    else if (array.length <= 100) maxWidth = 15;
    else maxWidth = 8;
    
    return {
      barWidth: Math.min(calculatedWidth, maxWidth),
      gap: gapSize
    };
  }, [containerWidth, array.length]);

  return (
    <div 
      className="array-wrapper" 
      ref={wrapperRef}
      style={{
        gap: `${gap}px`,
        minHeight: `${containerHeight}px`,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="popLayout">
        {array.map((item, index) => {
        const height = (item.value / maxValue) * containerHeight;
        
        let className = 'array-bar';
        if (item.isComparing) className += ' comparing';
        if (item.isSwapping) className += ' swapping';
        if (item.isSorted) className += ' sorted';
        if (item.isPivot) className += ' pivot';

        return (
          <motion.div
            key={item.id}
            className={className}
            style={{
              height: `${height}px`,
              width: `${barWidth}px`,
              flexShrink: 0,
              minWidth: '1px',
            }}
            initial={{ 
              height: `${height}px`,
              width: `${barWidth}px`,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              height: `${height}px`,
              width: `${barWidth}px`,
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.2 }
            }}
            transition={{ 
              duration: 0.25,
              ease: "easeOut",
              width: {
                duration: 0.3,
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.2
              },
              scale: {
                duration: 0.2
              }
            }}
            layout
            layoutId={`bar-${item.id}`}
            whileHover={{
              scale: array.length <= 20 ? 1.1 : array.length <= 50 ? 1.05 : 1.02,
              transition: { duration: 0.1 }
            }}
            whileTap={{
              scale: array.length <= 50 ? 1.05 : 1.02,
              transition: { duration: 0.05 }
            }}
          >
            {/* Value display for smaller arrays */}
            {array.length <= 30 && (
              <motion.span
                className="bar-value"
                style={{
                  position: 'absolute',
                  top: '-25px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: Math.min(10, barWidth * 0.8) + 'px',
                  color: 'white',
                  fontWeight: 'bold',
                  opacity: 0,
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                }}
                whileHover={{ opacity: 1 }}
              >
                {item.value}
              </motion.span>
            )}
          </motion.div>
        );
      })}
      </AnimatePresence>
    </div>
  );
};

export default ArrayBar;
