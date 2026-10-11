import React from 'react';
import { PlayerRole } from '../../types/volleyball';
import { ROLE_INFO } from '../../data/volleyballSystemData';

interface PositionCircleProps {
  x: number;
  y: number;
  role: PlayerRole;
  playerName: string;
  isActiveSetter?: boolean;
  isFrontRow?: boolean;
  receiveRole?: 'passer' | 'short' | 'setter';
  onClick: () => void;
}

const PositionCircle: React.FC<PositionCircleProps> = ({
  x,
  y,
  role,
  playerName,
  isActiveSetter = false,
  isFrontRow = false,
  receiveRole,
  onClick,
}) => {
  const roleConfig = ROLE_INFO[role];
  const radius = 24;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'pointer', transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      onClick={onClick}
    >
      {/* Outer halo / setter indicator */}
      {isActiveSetter && (
        <circle
          cx={0}
          cy={0}
          r={radius + 7}
          fill="none"
          stroke="#eab308"
          strokeWidth={3}
          strokeDasharray="4 3"
          className="setter-halo"
        />
      )}

      {/* Main token body */}
      <circle
        cx={0}
        cy={0}
        r={radius}
        fill="#ffffff"
        stroke={roleConfig.color}
        strokeWidth={3.5}
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.22))"
      />

      {/* Role Badge pill background */}
      <rect
        x={-18}
        y={-17}
        width={36}
        height={16}
        rx={8}
        fill={roleConfig.color}
      />

      {/* Role abbreviation (e.g. S1, RH1, M2) */}
      <text
        x={0}
        y={-5}
        textAnchor="middle"
        fontSize={11}
        fontWeight={800}
        fill="#ffffff"
        letterSpacing="0.5"
      >
        {role}
      </text>

      {/* Player name */}
      <text
        x={0}
        y={11}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill="#1e293b"
      >
        {playerName.length > 7 ? `${playerName.slice(0, 6)}…` : playerName || 'Leeg'}
      </text>

      {/* Sub-label tag: Receive duty (Passer, 3m Kort, Spelverdeler) */}
      {receiveRole === 'passer' && (
        <g>
          <rect x={-20} y={20} width={40} height={11} rx={5.5} fill="#0284c7" />
          <text x={0} y={28} textAnchor="middle" fontSize={7.5} fontWeight={800} fill="#ffffff">
            🛡️ PASSER
          </text>
        </g>
      )}

      {receiveRole === 'short' && (
        <g>
          <rect x={-22} y={20} width={44} height={11} rx={5.5} fill="#d97706" />
          <text x={0} y={28} textAnchor="middle" fontSize={7.5} fontWeight={800} fill="#ffffff">
            ⚡ 3M KORT
          </text>
        </g>
      )}

      {receiveRole === 'setter' && (
        <g>
          <rect x={-21} y={20} width={42} height={11} rx={5.5} fill="#eab308" />
          <text x={0} y={28} textAnchor="middle" fontSize={7} fontWeight={800} fill="#ffffff">
            🏐 VERDELER
          </text>
        </g>
      )}

      {!receiveRole && (
        <g>
          <rect
            x={-14}
            y={21}
            width={28}
            height={10}
            rx={5}
            fill={isFrontRow ? '#3b82f6' : '#64748b'}
            opacity={0.9}
          />
          <text
            x={0}
            y={28.5}
            textAnchor="middle"
            fontSize={7.5}
            fontWeight={700}
            fill="#ffffff"
          >
            {isFrontRow ? 'VOOR' : 'ACHTER'}
          </text>
        </g>
      )}
    </g>
  );
};

export default PositionCircle;
