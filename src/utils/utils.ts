import { Bubble } from '@/shared/types/BubbleType';
import { Dispatch, SetStateAction } from 'react';

export const findParentBubble = (bubbles: Bubble[], id: number): Bubble | undefined => {
  for (const bubble of bubbles) {
    if (bubble.id === id) {
      return bubble;
    }

    if (bubble.children && bubble.children.length > 0) {
      const parent = findParentBubble(bubble.children, id);
      if (parent) {
        return parent;
      }
    }
  }
  return undefined;
};

export const prevBubble = (
  prevBubbles: Bubble[],
  bubbles: Bubble[],
  setBubbles: Dispatch<SetStateAction<Bubble[]>>,
  setPrevBubbles: Dispatch<SetStateAction<Bubble[]>>,
  setSelectedBubble: Dispatch<SetStateAction<Bubble | null>>
) => {
  if (prevBubbles.length > 0) {
    const lastBubble = prevBubbles[prevBubbles.length - 1];
    const p = findParentBubble(bubbles, lastBubble.parentId as number);
    if (p) {
      p.children.push(lastBubble);
    } else {
      setBubbles((prev: Bubble[]) => [...prev, lastBubble]);
    }
    setPrevBubbles((prev) => prev.slice(0, -2));
  }
  setSelectedBubble(null);
};

export const addBubble = (
  parentBubble: Bubble | null,
  setBubbles: Dispatch<SetStateAction<Bubble[]>>,
  setSelectedBubble: Dispatch<SetStateAction<Bubble | null>>
) => {
  const yPosition = Math.random() * (window.innerHeight * 0.8);
  const xPosition = Math.random() * (window.innerWidth * 0.8);
  const newBubble: Bubble = {
    id: Math.random() * 10000,
    parentId: parentBubble ? parentBubble.id : null,
    bgColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
    children: [],
    position: {
      x: xPosition > 2000 ? xPosition % 2000 : xPosition,
      y: yPosition > 2000 ? yPosition % 2000 : yPosition,
    },
  };

  if (parentBubble) {
    parentBubble.children.push(newBubble);
    setBubbles((prev) => [...prev]);
  } else {
    setBubbles((prev) => [...prev, newBubble]);
  }
  setSelectedBubble(newBubble);
};

export const getContrastColor = (hexColor: string) => {
  const r = parseInt(hexColor.substr(1, 2), 16); // Get the red component
  const g = parseInt(hexColor.substr(3, 2), 16); // Get the green component
  const b = parseInt(hexColor.substr(5, 2), 16); // Get the blue component

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // Calculate the perceived luminance

  // Determine the contrasting color based on luminance
  return luminance > 0.5 ? '#4a3434' : '#ffefef'; // Return black for lighter backgrounds, white for darker backgrounds
};

export const deleteBubble = (
  selectbubble: Bubble,
  setBubbles: Dispatch<SetStateAction<Bubble[]>>,
  setPrevBubbles: Dispatch<SetStateAction<Bubble[]>>,
  setSelectedBubble: Dispatch<SetStateAction<Bubble | null>>
) => {
  if (selectbubble) {
    const deleteFromBubbles = (bubblesArr: Bubble[]): Bubble[] => {
      return bubblesArr.reduce((acc, bubble) => {
        if (bubble.id === selectbubble.id) {
          setPrevBubbles((prev) => [...prev, selectbubble]);
        } else {
          const updatedChildren = deleteFromBubbles(bubble.children);
          if (updatedChildren.length > 0 || bubble.id !== selectbubble.id) {
            acc.push({ ...bubble, children: updatedChildren });
          }
        }
        return acc;
      }, [] as Bubble[]);
    };
    setSelectedBubble(null);
    setBubbles((prev) => deleteFromBubbles(prev));
  }
};

export const handleOnClick = (bubble: Bubble, setSelectedBubble: (bubble: Bubble) => void) =>
  setSelectedBubble(bubble);
