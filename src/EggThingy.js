import React, { useState } from 'react';

function EggThingy() {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };

  const handleMouseOut = () => {
    setIsMouseOver(false);
  };

  const handleClick = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <div>
      <h1>Welcome to My Early 2000s Website!</h1>
      <p>This is a demonstration of an early 2000s style webpage.</p>
      <p>Click Count: {clickCount}</p>
      <svg
        width="200"
        height="300"
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        <ellipse
          cx="100"
          cy="150"
          rx="80"
          ry="120"
          fill={isMouseOver ? '#ff6666' : '#ffcc99'}
        />
      </svg>
    </div>
  );
}

export default EggThingy;