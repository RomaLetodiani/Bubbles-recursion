import { useState } from 'react';
import { Bubble } from '../shared/types/BubbleType';
import BubbleCircleNode from './BubbleCircleNode';
import { addBubble, deleteBubble, handleOnClick, prevBubble } from '../utils/utils';

const Bubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [prevBubbles, setPrevBubbles] = useState<Bubble[]>([]);
  const [selectedBubble, setSelectedBubble] = useState<Bubble | null>(null);

  return (
    <>
      <div className="w-11/12 m-auto p-5">
        <div className="h-[80vh] w-full overflow-auto relative rounded-3xl border-4 border-[#000000] bg-gradient-to-t from-teal-100 via-cyan-100 to-sky-100">
          {bubbles.map((bubble) => (
            <BubbleCircleNode
              depth={1}
              key={bubble.id}
              bubble={bubble}
              selectedBubble={selectedBubble}
              setSelectedBubble={setSelectedBubble}
              onClick={(bubble) => handleOnClick(bubble, setSelectedBubble)}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-5 m-auto w-max">
        <button
          className=" border-2 border-[#1d3255] font-bold rounded-3xl text-[#d7faff] shadow-2xl p-3 sm:p-5 sm:text-3xl bg-gradient-to-bl from-green-300 via-cyan-600 to-fuchsia-200 "
          onClick={() => addBubble(selectedBubble as Bubble, setBubbles, setSelectedBubble)}
        >
          ADD
        </button>
        <button
          className="border-2 border-[#1d3255] font-bold rounded-3xl text-[#d7faff] shadow-2xl p-3 sm:p-5 sm:text-3xl bg-gradient-to-tr from-cyan-600 via-green-300 to-cyan-600"
          onClick={() =>
            deleteBubble(selectedBubble as Bubble, setBubbles, setPrevBubbles, setSelectedBubble)
          }
        >
          DELETE
        </button>
        <button
          className="border-2 border-[#1d3255] font-bold rounded-3xl text-[#d7faff] shadow-2xl p-3 sm:p-5 sm:text-3xl bg-gradient-to-tr from-green-300 via-cyan-600 to-fuchsia-200 "
          onClick={() =>
            prevBubble(prevBubbles, bubbles, setBubbles, setPrevBubbles, setSelectedBubble)
          }
        >
          PREVIOUS
        </button>
      </div>
    </>
  );
};

export default Bubbles;
