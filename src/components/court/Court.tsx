import React from 'react';
import PositionCircle from './PositionCircle';

interface Assignment {
  position: string;
  player: string;
}

interface CourtProps {
  positions: string[];
  coords: { x: number; y: number }[];
  assignments: Assignment[];
  onCircleClick: (index: number) => void;
}

const POSITION_COLORS = ['#f87171', '#34d399', '#60a5fa', '#facc15', '#fb923c', '#2dd4bf'];

const Court: React.FC<CourtProps> = ({ positions, coords, assignments, onCircleClick }) => {
  return (
    <div className="card p-3 shadow-sm overflow-auto">
      <svg width="100%" viewBox="0 0 600 450">
        {/* Court rectangle */}
        <rect
          x={50}
          y={30}
          width={500}
          height={350}
          fill="#8fd0cc"
          stroke="#0d4681"
          strokeWidth={8}
        />
        {/* Net line */}
        <line
          x1={50}
          y1={175}
          x2={550}
          y2={175}
          stroke="#eaeaea"
          strokeWidth={4}
        />

        {/* Circles */}
        {coords.map((c, idx) => (
          <PositionCircle
            key={idx}
            x={c.x}
            y={c.y}
            label={positions[idx]}
            player={assignments[idx].player}
            onClick={() => onCircleClick(idx)}
            color={POSITION_COLORS[idx]}
          />
        ))}
      </svg>
    </div>
  );
};

export default Court;
