import React from 'react';
import { PlayerRole, CourtPhase } from '../../types/volleyball';
import { ROTATIONS_DATA, ROLE_INFO, validateReceiveCrossingRules } from '../../data/volleyballSystemData';

interface RotationPanelProps {
  currentRotation: number;
  phase: CourtPhase;
  playerNames: Record<PlayerRole, string>;
}

const RotationPanel: React.FC<RotationPanelProps> = ({
  currentRotation,
  phase,
  playerNames,
}) => {
  const config = ROTATIONS_DATA[currentRotation];
  const activeSetter = config.activeSetterRole;
  const activeSetterName = playerNames[activeSetter] || activeSetter;
  const validation = validateReceiveCrossingRules(config);

  // Roles in rotational order around the zones
  const zoneEntries: { zone: string; role: PlayerRole; isFront: boolean }[] = [
    { zone: 'P4 (Left Front)', role: config.zoneOrder.p4, isFront: true },
    { zone: 'P3 (Middle Front)', role: config.zoneOrder.p3, isFront: true },
    { zone: 'P2 (Right Front)', role: config.zoneOrder.p2, isFront: true },
    { zone: 'P5 (Left Back)', role: config.zoneOrder.p5, isFront: false },
    { zone: 'P6 (Middle Back)', role: config.zoneOrder.p6, isFront: false },
    { zone: 'P1 (Right Back)', role: config.zoneOrder.p1, isFront: false },
  ];

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h5 className="mb-0 fw-bold text-dark">{config.title}</h5>
          <span className="text-muted small">{config.description}</span>
        </div>
        <div className="badge bg-warning text-dark px-3 py-2 fs-6">
          🏐 Active Setter: <strong>{activeSetter} ({activeSetterName})</strong> in {config.activeSetterZone}
        </div>
      </div>

      <div className="card-body">
        {/* Live Crossing / Overlap Verification Box */}
        <div className={`alert ${validation.isAllValid ? 'alert-success' : 'alert-danger'} border-0 py-2 px-3 small mb-3`}>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <strong>
              {validation.isAllValid ? '✅ Crossing & Overlap Rules Compliant' : '⚠️ Positional Overlap Fault Detected'}
            </strong>
            <span className="badge bg-white text-dark border">
              FIVB / USAV Rule 7.4
            </span>
          </div>
          <div className="row g-1 mt-1 small">
            <div className="col-12 col-md-6">
              <span className={validation.p2p1Ok ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {validation.p2p1Ok ? '✓' : '✗'} P2 in front of P1
              </span>
              <span className="text-muted ms-1">({config.zoneOrder.p2} in front of {config.zoneOrder.p1})</span>
            </div>
            <div className="col-12 col-md-6">
              <span className={validation.p3p6Ok ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {validation.p3p6Ok ? '✓' : '✗'} P3 in front of P6
              </span>
              <span className="text-muted ms-1">({config.zoneOrder.p3} in front of {config.zoneOrder.p6})</span>
            </div>
            <div className="col-12 col-md-6">
              <span className={validation.p4p5Ok ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {validation.p4p5Ok ? '✓' : '✗'} P4 in front of P5
              </span>
              <span className="text-muted ms-1">({config.zoneOrder.p4} in front of {config.zoneOrder.p5})</span>
            </div>
            <div className="col-12 col-md-6">
              <span className={validation.frontRowLR && validation.backRowLR ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {validation.frontRowLR && validation.backRowLR ? '✓' : '✗'} Left-to-Right order legal
              </span>
            </div>
          </div>
        </div>

        {/* Youth 6-2 System Rules Reminder */}
        <div className="alert alert-info border-0 py-2 px-3 small mb-3">
          <strong>💡 6-2 Movement System for Kids:</strong>
          <ul className="mb-0 ps-3 mt-1">
            <li>
              <strong>Active Setter:</strong> Back-row setter sets from{' '}
              <span className="badge bg-secondary">P1</span>,{' '}
              <span className="badge bg-secondary">P6</span>, or{' '}
              <span className="badge bg-secondary">P5</span>.
            </li>
            <li>
              <strong>Outside Hitters:</strong> Transition to <strong>Left Front (P4)</strong> and{' '}
              <strong>Middle Back (P6)</strong>.
            </li>
            <li>
              <strong>Middle Blockers:</strong> Transition to <strong>Middle Front (P3)</strong> and{' '}
              <strong>Left Back (P5)</strong>.
            </li>
            <li>
              <strong>Setters:</strong> Transition to <strong>Right Front (P2)</strong> (front-row hitter/blocker) and{' '}
              <strong>Right Back (P1)</strong> (back-row defense).
            </li>
          </ul>
        </div>

        {/* 3-Passer Formation Summary */}
        <div className="card bg-light border-0 p-2 mb-3">
          <div className="row g-2 text-center small">
            <div className="col-12 col-md-6">
              <div className="p-2 rounded bg-white border border-primary-subtle">
                <span className="badge bg-primary mb-1">🛡️ 3 Primary Passers (On Line)</span>
                <div className="fw-bold text-dark mt-1">
                  {config.passerRoles.map((r) => `${r} (${playerNames[r] || r})`).join(' • ')}
                </div>
                <div className="text-muted" style={{ fontSize: '10px' }}>
                  Evenly spaced across width at x=180, 300, 420
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="p-2 rounded bg-white border border-warning-subtle">
                <span className="badge bg-warning text-dark mb-1">⚡ 2 at 3m Line (Short Serves)</span>
                <div className="fw-bold text-dark mt-1">
                  {config.shortServeRoles.map((r) => `${r} (${playerNames[r] || r})`).join(' • ')}
                </div>
                <div className="text-muted" style={{ fontSize: '10px' }}>
                  Cover short balls & ready for quick transition attack
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player instructions list */}
        <h6 className="fw-bold text-secondary mb-2 small text-uppercase">
          Individual Player Tasks (Rotation {currentRotation + 1})
        </h6>
        <div className="list-group list-group-flush border rounded">
          {zoneEntries.map(({ zone, role, isFront }) => {
            const info = ROLE_INFO[role];
            const name = playerNames[role] || role;
            const instruction = config.playerInstructions[role];
            const isCurrentActiveSetter = role === activeSetter;

            return (
              <div
                key={role}
                className="list-group-item d-flex align-items-start gap-3 py-2 px-3"
                style={{ backgroundColor: isCurrentActiveSetter ? '#fffbeb' : '#ffffff' }}
              >
                <div className="d-flex flex-column align-items-center" style={{ minWidth: '70px' }}>
                  <span
                    className="badge mb-1"
                    style={{ backgroundColor: info.color, color: '#fff' }}
                  >
                    {role} {isCurrentActiveSetter && '★'}
                  </span>
                  <span
                    className={`badge badge-sm ${isFront ? 'bg-primary-subtle text-primary' : 'bg-secondary-subtle text-secondary'}`}
                    style={{ fontSize: '9px' }}
                  >
                    {isFront ? 'Front Row' : 'Back Row'}
                  </span>
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong className="text-dark">
                      {name}{' '}
                      <span className="text-muted fw-normal small">({info.title})</span>
                    </strong>
                    <span className="badge bg-light text-muted border small">
                      Starts in {zone.split(' ')[0]}
                    </span>
                  </div>
                  <p className="small text-muted mb-0">{instruction}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RotationPanel;
