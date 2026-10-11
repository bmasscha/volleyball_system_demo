import React from 'react';
import PositionCircle from './PositionCircle';
import { PlayerRole, CourtPhase, PositionPoint } from '../../types/volleyball';
import { ROTATIONS_DATA, SETTING_TARGET, ROLE_INFO } from '../../data/volleyballSystemData';

interface CourtProps {
  currentRotation: number; // 0 t/m 5
  phase: CourtPhase;
  playerNames: Record<PlayerRole, string>;
  showArrows: boolean;
  showCrossingLines?: boolean;
  onCircleClick: (role: PlayerRole) => void;
}

const Court: React.FC<CourtProps> = ({
  currentRotation,
  phase,
  playerNames,
  showArrows,
  showCrossingLines = true,
  onCircleClick,
}) => {
  const rotationConfig = ROTATIONS_DATA[currentRotation];

  // Coördinaten ophalen op basis van fase
  const getCoordinates = (role: PlayerRole): PositionPoint => {
    if (phase === 'base') {
      return rotationConfig.basePositions[role];
    }
    if (phase === 'serve') {
      return rotationConfig.servePositions[role];
    }
    return rotationConfig.receivePositions[role];
  };

  // Bepalen of speler in voorste rij staat
  const isFrontRow = (role: PlayerRole): boolean => {
    const { p4, p3, p2 } = rotationConfig.zoneOrder;
    return role === p4 || role === p3 || role === p2;
  };

  // Receptierol bepalen in ontvangstfase
  const getReceiveRole = (role: PlayerRole): 'passer' | 'short' | 'setter' | undefined => {
    if (phase !== 'receive') return undefined;
    if (role === rotationConfig.activeSetterRole) return 'setter';
    if (rotationConfig.passerRoles.includes(role)) return 'passer';
    if (rotationConfig.shortServeRoles.includes(role)) return 'short';
    return undefined;
  };

  // Vloeiende boog voor bewegingspijlen
  const getArrowPath = (start: PositionPoint, end: PositionPoint): string => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 25) return '';

    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;
    const offset = dx > 0 ? -22 : 22;
    return `M ${start.x} ${start.y} Q ${mx + offset} ${my} ${end.x} ${end.y}`;
  };

  const allRoles: PlayerRole[] = ['S1', 'RH1', 'M1', 'S2', 'RH2', 'M2'];
  const { p1, p2, p3, p4, p5, p6 } = rotationConfig.zoneOrder;
  const currentCoords = {
    p1: getCoordinates(p1),
    p2: getCoordinates(p2),
    p3: getCoordinates(p3),
    p4: getCoordinates(p4),
    p5: getCoordinates(p5),
    p6: getCoordinates(p6),
  };

  return (
    <div className="court-container position-relative">
      <svg
        viewBox="0 0 600 500"
        className="w-100 h-auto rounded shadow-sm"
        style={{
          background: 'linear-gradient(180deg, #1e3a8a 0%, #172554 100%)',
          maxHeight: '620px',
        }}
      >
        <defs>
          {/* Pijlpunt markers voor elke positie */}
          {allRoles.map((role) => (
            <marker
              key={role}
              id={`arrowhead-${role}`}
              markerWidth="7"
              markerHeight="6"
              refX="6"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 7 3, 0 6" fill={ROLE_INFO[role].color} />
            </marker>
          ))}
          <marker
            id="arrowhead-target"
            markerWidth="8"
            markerHeight="7"
            refX="7"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 8 3.5, 0 7" fill="#f59e0b" />
          </marker>

          {/* Vloer textuur */}
          <linearGradient id="courtWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.95" />
          </linearGradient>

          {/* Net patroon */}
          <pattern id="netMesh" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 10 10 M 10 0 L 0 10" stroke="#94a3b8" strokeWidth="0.8" opacity="0.4" />
          </pattern>
        </defs>

        {/* Buitenveld */}
        <rect x="20" y="20" width="560" height="460" rx="10" fill="#0f172a" opacity="0.6" />

        {/* Volleybalveld speelhelft (70 tot 530 x 50 tot 410) */}
        <rect
          x="70"
          y="50"
          width="460"
          height="360"
          fill="url(#courtWood)"
          stroke="#ffffff"
          strokeWidth="4"
        />

        {/* Zone Watermerken op het veld */}
        <g opacity="0.25" fontWeight="800" fontSize="20" fill="#ffffff" textAnchor="middle">
          {/* Voorste rij zones */}
          <text x="150" y="115">P4 (LV)</text>
          <text x="300" y="115">P3 (MV)</text>
          <text x="450" y="115">P2 (RV)</text>

          {/* Achterste rij zones */}
          <text x="150" y="340">P5 (LA)</text>
          <text x="300" y="360">P6 (MA)</text>
          <text x="450" y="340">P1 (RA)</text>
        </g>

        {/* 3-Meter Aanvalslijn */}
        <line
          x1="70"
          y1="170"
          x2="530"
          y2="170"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeDasharray="12 6"
        />
        <text
          x="80"
          y="164"
          fill="#f8fafc"
          fontSize="11"
          fontWeight="700"
          opacity="0.9"
        >
          3m AANVALSLIJN (ZONE KORTE OPSLAG)
        </text>

        {/* Achterlijn (Servicelijn) */}
        <line x1="70" y1="410" x2="530" y2="410" stroke="#ffffff" strokeWidth="4" />
        <text
          x="300"
          y="435"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="11"
          fontWeight="600"
          letterSpacing="1"
        >
          ACHTERLIJN (OPSLAGZONE)
        </text>

        {/* Het Net aan de bovenzijde */}
        <rect x="50" y="32" width="500" height="18" fill="url(#netMesh)" />
        <rect x="50" y="44" width="500" height="6" fill="#f8fafc" stroke="#334155" strokeWidth="1" />
        <text
          x="300"
          y="40"
          textAnchor="middle"
          fill="#f8fafc"
          fontSize="12"
          fontWeight="900"
          letterSpacing="2"
        >
          NET (MIDDENLIJN)
        </text>
        {/* Antennes op de zijlijnen */}
        <line x1="70" y1="26" x2="70" y2="52" stroke="#ef4444" strokeWidth="4" />
        <line x1="530" y1="26" x2="530" y2="52" stroke="#ef4444" strokeWidth="4" />

        {/* Passlijn gids (in Receptie fase) */}
        {phase === 'receive' && (
          <g opacity="0.45">
            <line
              x1="90"
              y1="285"
              x2="510"
              y2="285"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
            <text
              x="520"
              y="288"
              fill="#38bdf8"
              fontSize="9"
              fontWeight="bold"
              textAnchor="end"
            >
              PASSLIJN (3 PASSERS)
            </text>
          </g>
        )}

        {/* Spelverdelersplek / Doelgebied aan het net */}
        <g opacity={phase === 'receive' ? 0.9 : 0.45}>
          <circle
            cx={SETTING_TARGET.x}
            cy={SETTING_TARGET.y}
            r="16"
            fill="rgba(245, 158, 11, 0.15)"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <text
            x={SETTING_TARGET.x}
            y={SETTING_TARGET.y + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill="#fbbf24"
          >
            🏐 Doel
          </text>
        </g>

        {/* Opstellingslijnen gids */}
        {showCrossingLines && phase === 'receive' && (
          <g opacity="0.35" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3">
            <line x1={currentCoords.p2.x} y1={currentCoords.p2.y} x2={currentCoords.p1.x} y2={currentCoords.p1.y} />
            <line x1={currentCoords.p3.x} y1={currentCoords.p3.y} x2={currentCoords.p6.x} y2={currentCoords.p6.y} />
            <line x1={currentCoords.p4.x} y1={currentCoords.p4.y} x2={currentCoords.p5.x} y2={currentCoords.p5.y} />
            <line x1={currentCoords.p4.x} y1={currentCoords.p4.y} x2={currentCoords.p3.x} y2={currentCoords.p3.y} />
            <line x1={currentCoords.p3.x} y1={currentCoords.p3.y} x2={currentCoords.p2.x} y2={currentCoords.p2.y} />
            <line x1={currentCoords.p5.x} y1={currentCoords.p5.y} x2={currentCoords.p6.x} y2={currentCoords.p6.y} />
            <line x1={currentCoords.p6.x} y1={currentCoords.p6.y} x2={currentCoords.p1.x} y2={currentCoords.p1.y} />
          </g>
        )}

        {/* Bewegingspijlen (Receptie ➔ Basis) */}
        {showArrows && phase === 'receive' && (
          <g className="transition-arrows">
            {allRoles.map((role) => {
              const start = rotationConfig.receivePositions[role];
              const end = rotationConfig.basePositions[role];
              const pathD = getArrowPath(start, end);
              if (!pathD) return null;

              return (
                <path
                  key={`arrow-${role}`}
                  d={pathD}
                  fill="none"
                  stroke={ROLE_INFO[role].color}
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  markerEnd={`url(#arrowhead-${role})`}
                  opacity="0.85"
                />
              );
            })}

            {/* Looplijn voor actieve spelverdeler naar het doel aan het net */}
            {(() => {
              const activeSetterRole = rotationConfig.activeSetterRole;
              const setterStart = rotationConfig.receivePositions[activeSetterRole];
              const targetPath = getArrowPath(setterStart, SETTING_TARGET);
              if (!targetPath) return null;
              return (
                <path
                  d={targetPath}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  markerEnd="url(#arrowhead-target)"
                  opacity="0.95"
                />
              );
            })()}
          </g>
        )}

        {/* Spelersfiches */}
        {allRoles.map((role) => {
          const coord = getCoordinates(role);
          const activeSetter = role === rotationConfig.activeSetterRole;
          const front = isFrontRow(role);
          const rRole = getReceiveRole(role);

          return (
            <PositionCircle
              key={role}
              x={coord.x}
              y={coord.y}
              role={role}
              playerName={playerNames[role]}
              isActiveSetter={activeSetter}
              isFrontRow={front}
              receiveRole={rRole}
              onClick={() => onCircleClick(role)}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default Court;
