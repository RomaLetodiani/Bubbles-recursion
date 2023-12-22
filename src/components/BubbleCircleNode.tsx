import { Bubble } from '@/shared/types/BubbleType';
import { getContrastColor } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

const BubbleCircleNode = ({
  bubble,
  depth = 1,
  onClick,
  selectedBubble,
  setSelectedBubble,
}: {
  bubble: Bubble;
  depth: number;
  selectedBubble: Bubble | null;
  setSelectedBubble: (bubble: Bubble | null) => void;
  onClick: (bubble: Bubble) => void;
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldAnimate(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onClick(bubble);
  };
  return (
    <>
      <div
        className={`absolute flex items-center  justify-center w-12 h-12 rounded-full shadow-2xl  transition-all cursor-pointer ${
          selectedBubble?.id === bubble.id ? 'ring-4 ring-rose-500' : 'ring-2 ring-slate-600'
        } ${shouldAnimate ? 'scale-100' : 'scale-0'} hover:scale-110`}
        onClick={handleClick}
        style={{
          backgroundColor: bubble.bgColor.length === 7 ? bubble.bgColor : '#000000',
          color: getContrastColor(bubble.bgColor),
          left: bubble.position.x,
          top: bubble.position.y,
        }}
      >
        <p>{depth}</p>
      </div>
      {bubble.children.map((child) => (
        <BubbleCircleNode
          key={child.id}
          bubble={child}
          selectedBubble={selectedBubble}
          setSelectedBubble={setSelectedBubble}
          depth={depth + 1}
          onClick={onClick}
        />
      ))}
    </>
  );
};

export default BubbleCircleNode;
