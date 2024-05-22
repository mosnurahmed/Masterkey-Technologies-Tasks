import React, { useState, useRef } from 'react';
import './Partition.css';
import { getRandomColor } from './utils';

const Partition = ({ color }) => {
  const [isSplit, setIsSplit] = useState(false);
  const [isVertical, setIsVertical] = useState(true);
  const [size, setSize] = useState(50);
  const [childPartitions, setChildPartitions] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  const handleSplit = (vertical) => {
    setIsSplit(true);
    setIsVertical(vertical);
    const newChild1 = { id: Date.now(), color: color };
    const newChild2 = { id: newChild1.id + 1, color: getRandomColor() };
    setChildPartitions([newChild1, newChild2]);
  };

  const handleRemove = () => {
    setIsVisible(false);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (isVertical) {
        const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
        setSize(newWidth);
      } else {
        const newHeight = ((e.clientY - rect.top) / rect.height) * 100;
        setSize(newHeight);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };



  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="partition"
      ref={containerRef}
      style={{
        backgroundColor: color,
        flex: `${size} ${size} auto`,
        position: 'relative',
      }}
    >
      {!isSplit ? (
        <div className="controls">
          <p onClick={() => handleSplit(true)}>V</p>
          <p onClick={() => handleSplit(false)}>H</p>
          <p onClick={handleRemove}>-</p>
         
        </div>
      ) : (
        <div className="split-container" style={{ flexDirection: isVertical ? 'row' : 'column' }}>
          {childPartitions.map((child, index) => (
            <React.Fragment key={child.id}>
              <Partition color={child.color} />
              {index === 0 && (
                <div
                  className={`resizer ${isVertical ? 'vertical' : 'horizontal'}`}
                  onMouseDown={handleMouseDown}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
export default Partition;