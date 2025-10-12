import React from 'react';

interface Props {
  x: number;
  y: number;
  label: string;
  player: string;
  onClick: () => void;
  color?: string; // Accepts custom stroke color
}

const PositionCircle: React.FC<Props> = ({ x, y, label, player, onClick, color = '#0d4681' }) => {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'pointer' }} // Bootstrap doesn't style SVG elements, use inline
      onClick={onClick}
    >
      <circle
        cx={0}
        cy={0}
        r={25}
        fill="#fff"
        stroke={color}
        strokeWidth={4}
      />

      {/* Position label */}
      <text
        x={0}
        y={-6}
        textAnchor="middle"
        fontSize={12}
        fontWeight={700}
        fill="#343a40" // Bootstrap text-dark equivalent
      >
        {label}
      </text>

      {/* Player name */}
      {player && (
        <text
          x={0}
          y={15}
          textAnchor="middle"
          fontSize={12}
          fill="#343a40"
        >
          {player}
        </text>
      )}
    </g>
  );
};

export default PositionCircle;
