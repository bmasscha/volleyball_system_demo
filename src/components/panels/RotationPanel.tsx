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

  const zoneEntries: { zone: string; role: PlayerRole; isFront: boolean }[] = [
    { zone: 'P4 (Links-voor)', role: config.zoneOrder.p4, isFront: true },
    { zone: 'P3 (Midden-voor)', role: config.zoneOrder.p3, isFront: true },
    { zone: 'P2 (Rechts-voor)', role: config.zoneOrder.p2, isFront: true },
    { zone: 'P5 (Links-achter)', role: config.zoneOrder.p5, isFront: false },
    { zone: 'P6 (Midden-achter)', role: config.zoneOrder.p6, isFront: false },
    { zone: 'P1 (Rechts-achter)', role: config.zoneOrder.p1, isFront: false },
  ];

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div>
          <h5 className="mb-0 fw-bold text-dark">{config.title}</h5>
          <span className="text-muted small">{config.description}</span>
        </div>
        <div className="badge bg-warning text-dark px-3 py-2 fs-6">
          🏐 Actieve Spelverdeler: <strong>{activeSetter} ({activeSetterName})</strong> in {config.activeSetterZone}
        </div>
      </div>

      <div className="card-body">
        {/* Controle opstellingsfouten */}
        <div className={`alert ${validation.isAllValid ? 'alert-success' : 'alert-danger'} border-0 py-2 px-3 small mb-3`}>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <strong>
              {validation.isAllValid ? '✅ Opstellingsregels & Posities Foutvrij' : '⚠️ Opstellingsfout / Overlap Gedetecteerd'}
            </strong>
            <span className="badge bg-white text-dark border">
              FIVB Regels
            </span>
          </div>
          <div className="row g-1 mt-1 small">
            <div className="col-12 col-md-6">
              <span className={validation.p2p1Ok ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {validation.p2p1Ok ? '✓' : '✗'} P2 staat voor P1
              </span>
              <span className="text-muted ms-1">({config.zoneOrder.p2} voor {config.zoneOrder.p1})</span>
            </div>
            <div className="col-12 col-md-6">
              <span className={validation.p3p6Ok ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {validation.p3p6Ok ? '✓' : '✗'} P3 staat voor P6
              </span>
              <span className="text-muted ms-1">({config.zoneOrder.p3} voor {config.zoneOrder.p6})</span>
            </div>
            <div className="col-12 col-md-6">
              <span className={validation.p4p5Ok ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {validation.p4p5Ok ? '✓' : '✗'} P4 staat voor P5
              </span>
              <span className="text-muted ms-1">({config.zoneOrder.p4} voor {config.zoneOrder.p5})</span>
            </div>
            <div className="col-12 col-md-6">
              <span className={validation.frontRowLR && validation.backRowLR ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                {validation.frontRowLR && validation.backRowLR ? '✓' : '✗'} Links-naar-rechts volgorde klopt
              </span>
            </div>
          </div>
        </div>

        {/* 6-2 Systeemregels voor de jeugd */}
        <div className="alert alert-info border-0 py-2 px-3 small mb-3">
          <strong>💡 6-2 Systeembasis voor de Jeugd:</strong>
          <ul className="mb-0 ps-3 mt-1">
            <li>
              <strong>Spelverdeler (S):</strong> Achterste verdeelt vanuit{' '}
              <span className="badge bg-secondary">P1</span>,{' '}
              <span className="badge bg-secondary">P6</span>, of{' '}
              <span className="badge bg-secondary">P5</span> (loopt naar het net).
            </li>
            <li>
              <strong>Receptie-hoek (RH):</strong> Gaat naar <strong>Links-voor (P4)</strong> en{' '}
              <strong>Midden-achter (P6)</strong>.
            </li>
            <li>
              <strong>Midden-spelers (M):</strong> Gaan naar <strong>Midden-voor (P3)</strong> en{' '}
              <strong>Links-achter (P5)</strong>.
            </li>
            <li>
              <strong>Spelverdelers (S):</strong> Gaan naar <strong>Rechts-voor (P2)</strong> (aanval/blok) en{' '}
              <strong>Rechts-achter (P1)</strong> (verdediging).
            </li>
          </ul>
        </div>

        {/* 3 Passers + 2 Bewakers */}
        <div className="card bg-light border-0 p-2 mb-3">
          <div className="row g-2 text-center small">
            <div className="col-12 col-md-6">
              <div className="p-2 rounded bg-white border border-primary-subtle">
                <span className="badge bg-primary mb-1">🛡️ 3 Passers (Passlijn)</span>
                <div className="fw-bold text-dark mt-1">
                  {config.passerRoles.map((r) => `${r} (${playerNames[r] || r})`).join(' • ')}
                </div>
                <div className="text-muted" style={{ fontSize: '10px' }}>
                  Gelijkmatig over de breedte (x=180, 300, 420)
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="p-2 rounded bg-white border border-warning-subtle">
                <span className="badge bg-warning text-dark mb-1">⚡ 2 aan de 3m-lijn (Korte ballen)</span>
                <div className="fw-bold text-dark mt-1">
                  {config.shortServeRoles.map((r) => `${r} (${playerNames[r] || r})`).join(' • ')}
                </div>
                <div className="text-muted" style={{ fontSize: '10px' }}>
                  Korte opslag opvangen & klaar voor aanval
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Taken per speler */}
        <h6 className="fw-bold text-secondary mb-2 small text-uppercase">
          Individuele Taken (Rotatie {currentRotation + 1})
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
                    {isFront ? 'Voorste rij' : 'Achterste rij'}
                  </span>
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong className="text-dark">
                      {name}{' '}
                      <span className="text-muted fw-normal small">({info.title})</span>
                    </strong>
                    <span className="badge bg-light text-muted border small">
                      Start in {zone.split(' ')[0]}
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
