'use client';

import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

const CustomCursor: React.FC = () => {
  // We only need a ref for the central dot now
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      // The main dot follows exactly with no delay
      if (dotRef.current) {
        // Hardware acceleration remains for performance
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Return ONLY the dot element
  return (
    <div ref={dotRef} className={styles.dot} aria-hidden="true" />
  );
};

export default CustomCursor;