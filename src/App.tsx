import React, { useState, useEffect } from 'react';
import Court from './components/court/Court';
import RotationPanel from './components/panels/RotationPanel';
import RosterPanel from './components/panels/RosterPanel';
import { PlayerRole, CourtPhase } from './types/volleyball';
import { ROTATIONS_DATA, ROLE_INFO } from './data/volleyballSystemData';
import 'bootstrap/dist/css/bootstrap.min.css';

const DEFAULT_PLAYER_NAMES: Record<PlayerRole, string> = {
  S1: 'Juna',
  RH1: 'Madelein',
  M1: 'Elisa',
  S2: 'Sil',
  RH2: 'Kaat',
  M2: 'Jinte',
};

const INITIAL_ROSTER_POOL: string[] = [
  'Juna',
  'Madelein',
  'Elisa',
  'Sil',
  'Kaat',
  'Jinte',
  'Alixe',
  'Frieke',
  'Anna',
];

export default function App() {
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const [phase, setPhase] = useState<CourtPhase>('receive');
  const [showArrows, setShowArrows] = useState<boolean>(true);
  const [showCrossingLines, setShowCrossingLines] = useState<boolean>(true);
  const [playerNames, setPlayerNames] = useState<Record<PlayerRole, string>>(DEFAULT_PLAYER_NAMES);
  const [rosterPool, setRosterPool] = useState<string[]>(INITIAL_ROSTER_POOL);
  const [activeTab, setActiveTab] = useState<'court' | 'roster' | 'reference'>('court');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Auto-demonstratie van de looplijnen voor de kinderen
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setTimeout(() => {
        setPhase((prev) => (prev === 'receive' ? 'base' : 'receive'));
      }, 2200);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, phase]);

  const handleUpdatePlayer = (role: PlayerRole, newName: string) => {
    setPlayerNames((prev) => ({ ...prev, [role]: newName }));
  };

  const handleAddRosterPlayer = (name: string) => {
    if (!rosterPool.includes(name)) {
      setRosterPool((prev) => [...prev, name]);
    }
  };

  const handleRemoveRosterPlayer = (name: string) => {
    setRosterPool((prev) => prev.filter((p) => p !== name));
  };

  const handleCircleClick = (role: PlayerRole) => {
    const currentName = playerNames[role];
    const newName = window.prompt(
      `Wijs speler toe voor ${ROLE_INFO[role].title} (${role}):`,
      currentName
    );
    if (newName !== null && newName.trim() !== '') {
      handleUpdatePlayer(role, newName.trim());
      handleAddRosterPlayer(newName.trim());
    }
  };

  const currentConfig = ROTATIONS_DATA[currentRotation];

  return (
    <div className="bg-light min-vh-100 py-2 py-md-4">
      <div className="container" style={{ maxWidth: '1140px' }}>
        {/* App Header */}
        <header className="card shadow-sm border-0 mb-3 overflow-hidden">
          <div
            className="p-3 p-md-4 text-white"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)',
            }}
          >
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
              <div>
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-2">🏐</span>
                  <h1 className="h3 mb-0 fw-bold">Volleybal 6-2 Systeem</h1>
                </div>
                <p className="mb-0 text-white-50 small mt-1">
                  Jeugd rotatiebord zonder libero • 2 Spelverdelers verdelen uit P1, P6 & P5 • RH naar P4 & P6 • M naar P3 & P5 • S naar P2 & P1
                </p>
              </div>

              {/* Tab knoppen */}
              <div className="btn-group bg-white p-1 rounded-3 shadow-sm align-self-start align-self-md-auto">
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'court' ? 'btn-primary' : 'btn-light text-dark'}`}
                  onClick={() => setActiveTab('court')}
                >
                  🏟️ Veldweergave
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'roster' ? 'btn-primary' : 'btn-light text-dark'}`}
                  onClick={() => setActiveTab('roster')}
                >
                  👥 Teamopstelling
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'reference' ? 'btn-primary' : 'btn-light text-dark'}`}
                  onClick={() => setActiveTab('reference')}
                >
                  📋 Spiekbrief
                </button>
              </div>
            </div>
          </div>

          {/* Rotatie selector balk */}
          <div className="bg-white p-3 border-top">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
              <span className="fw-bold small text-secondary text-uppercase letter-spacing">
                Kies Rotatie (1 t/m 6):
              </span>
              <span className="badge bg-light text-dark border">
                Actieve Spelverdeler: <strong className="text-warning-emphasis">{currentConfig.activeSetterRole}</strong> ({playerNames[currentConfig.activeSetterRole]}) in <strong className="text-primary">{currentConfig.activeSetterZone}</strong>
              </span>
            </div>

            <div className="row g-2">
              {ROTATIONS_DATA.map((rot, idx) => {
                const isActive = currentRotation === idx;
                const setterName = playerNames[rot.activeSetterRole] || rot.activeSetterRole;

                return (
                  <div key={rot.rotationNumber} className="col-6 col-sm-4 col-md-2">
                    <button
                      type="button"
                      onClick={() => setCurrentRotation(idx)}
                      className={`btn w-100 text-start py-2 px-2 h-100 border transition-all ${
                        isActive
                          ? 'btn-primary shadow-sm border-primary'
                          : 'btn-outline-secondary bg-white text-dark'
                      }`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <strong className="d-block">Rotatie {rot.rotationNumber}</strong>
                        <span
                          className={`badge rounded-pill ${
                            isActive ? 'bg-light text-primary' : 'bg-primary-subtle text-primary'
                          }`}
                          style={{ fontSize: '10px' }}
                        >
                          {rot.activeSetterZone}
                        </span>
                      </div>
                      <div
                        className={`small text-truncate mt-1 ${
                          isActive ? 'text-white-50' : 'text-muted'
                        }`}
                        style={{ fontSize: '11px' }}
                      >
                        Verdeler: {rot.activeSetterRole} ({setterName})
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* Tab 1: Veldweergave */}
        {activeTab === 'court' && (
          <div className="row g-3">
            {/* Linkerkolom: Veld & Besturing */}
            <div className="col-12 col-lg-7">
              <div className="card shadow-sm border-0 mb-3">
                {/* Fasenknoppen */}
                <div className="card-header bg-white py-2 px-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div className="btn-group btn-group-sm">
                    <button
                      type="button"
                      className={`btn ${phase === 'receive' ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setPhase('receive')}
                    >
                      🏐 1. Receptie (Ontvangst)
                    </button>
                    <button
                      type="button"
                      className={`btn ${phase === 'base' ? 'btn-success' : 'btn-outline-secondary'}`}
                      onClick={() => setPhase('base')}
                    >
                      🛡️ 2. Na de Pass (Basis)
                    </button>
                    <button
                      type="button"
                      className={`btn ${phase === 'serve' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                      onClick={() => setPhase('serve')}
                    >
                      🎯 3. Onze Opslag
                    </button>
                  </div>

                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <div className="form-check form-switch mb-0 small">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="showArrowsSwitch"
                        checked={showArrows}
                        onChange={(e) => setShowArrows(e.target.checked)}
                      />
                      <label className="form-check-label small" htmlFor="showArrowsSwitch">
                        Pijlen
                      </label>
                    </div>

                    <div className="form-check form-switch mb-0 small">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="showCrossingSwitch"
                        checked={showCrossingLines}
                        onChange={(e) => setShowCrossingLines(e.target.checked)}
                      />
                      <label className="form-check-label small" htmlFor="showCrossingSwitch">
                        Opstellingslijnen
                      </label>
                    </div>

                    <button
                      type="button"
                      className={`btn btn-xs btn-sm ${isAnimating ? 'btn-danger' : 'btn-outline-primary'}`}
                      onClick={() => setIsAnimating(!isAnimating)}
                      title="Demonstreer beweging tussen Receptie en Basis"
                    >
                      {isAnimating ? '⏸ Stop' : '▶ Animeer'}
                    </button>
                  </div>
                </div>

                {/* Veld Component */}
                <div className="card-body p-2 p-md-3 bg-dark rounded-bottom">
                  <Court
                    currentRotation={currentRotation}
                    phase={phase}
                    playerNames={playerNames}
                    showArrows={showArrows}
                    showCrossingLines={showCrossingLines}
                    onCircleClick={handleCircleClick}
                  />

                  {/* Interactieve tip */}
                  <div className="d-flex justify-content-between align-items-center text-white-50 small mt-2 px-2">
                    <span>💡 <em>Tik op een speler om de naam aan te passen</em></span>
                    <span className="badge bg-warning text-dark">★ = Actieve Spelverdeler</span>
                  </div>
                </div>
              </div>

              {/* Positiesamenvatting */}
              <div className="card shadow-sm border-0 p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0 text-dark">
                    Posities na de Pass (Aanval / Basis):
                  </h6>
                  {(currentRotation === 0 || currentRotation === 3) && (
                    <span className="badge bg-info-subtle text-info-emphasis border">
                      ★ Rot {currentRotation + 1}: RH valt Rechts aan (P2), S valt Links aan (P4)
                    </span>
                  )}
                </div>
                <div className="row g-2 text-center small">
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-primary-subtle">
                      <div className="text-muted fw-semibold">Links-voor (P4)</div>
                      <strong className="text-primary">
                        {currentRotation === 0 || currentRotation === 3 ? 'Spelverdeler (S)' : 'Receptie-hoek (RH)'}
                      </strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-success-subtle">
                      <div className="text-muted fw-semibold">Midden-voor (P3)</div>
                      <strong className="text-success">Midden-speler (M)</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-warning-subtle">
                      <div className="text-muted fw-semibold">Rechts-voor (P2)</div>
                      <strong className="text-warning-emphasis">
                        {currentRotation === 0 || currentRotation === 3 ? 'Receptie-hoek (RH)' : 'Spelverdeler (S)'}
                      </strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-success-subtle">
                      <div className="text-muted fw-semibold">Links-achter (P5)</div>
                      <strong className="text-success">Midden-speler (M)</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-primary-subtle">
                      <div className="text-muted fw-semibold">Midden-achter (P6)</div>
                      <strong className="text-primary">Receptie-hoek (RH)</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-warning-subtle">
                      <div className="text-muted fw-semibold">Rechts-achter (P1)</div>
                      <strong className="text-warning-emphasis">Spelverdeler (S)</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rechterkolom: Taken per rotatie */}
            <div className="col-12 col-lg-5">
              <RotationPanel
                currentRotation={currentRotation}
                phase={phase}
                playerNames={playerNames}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Teamopstelling */}
        {activeTab === 'roster' && (
          <RosterPanel
            playerNames={playerNames}
            onUpdatePlayer={handleUpdatePlayer}
            rosterList={rosterPool}
            onAddRosterPlayer={handleAddRosterPlayer}
            onRemoveRosterPlayer={handleRemoveRosterPlayer}
          />
        )}

        {/* Tab 3: Spiekbrief */}
        {activeTab === 'reference' && (
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-header bg-white py-3 border-bottom">
              <h5 className="mb-0 fw-bold text-dark">📋 Spiekbrief Volleybal 6-2 Systeem</h5>
              <p className="text-muted small mb-0">
                Overzicht van alle 6 rotaties voor coaches en spelers
              </p>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Rotatie</th>
                    <th>Actieve Spelverdeler</th>
                    <th>Voorste Rij (Aanvallers)</th>
                    <th>Achterste Rij (Pass & Verdediging)</th>
                    <th>Positiewissel na Pass</th>
                  </tr>
                </thead>
                <tbody>
                  {ROTATIONS_DATA.map((r) => (
                    <tr
                      key={r.rotationNumber}
                      className={r.rotationNumber === currentRotation + 1 ? 'table-primary' : ''}
                    >
                      <td className="fw-bold">
                        Rotatie {r.rotationNumber}
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark me-1">
                          {r.activeSetterRole}
                        </span>{' '}
                        in <strong>{r.activeSetterZone}</strong> ({playerNames[r.activeSetterRole]})
                      </td>
                      <td>
                        <span className="small">
                          P4: <strong>{r.zoneOrder.p4}</strong>, P3: <strong>{r.zoneOrder.p3}</strong>, P2: <strong>{r.zoneOrder.p2}</strong>
                        </span>
                      </td>
                      <td>
                        <span className="small">
                          P5: <strong>{r.zoneOrder.p5}</strong>, P6: <strong>{r.zoneOrder.p6}</strong>, P1: <strong>{r.zoneOrder.p1}</strong>
                        </span>
                      </td>
                      <td>
                        <span className="small text-muted">
                          {r.rotationNumber === 1 || r.rotationNumber === 4
                            ? 'RH ➔ P2 (Rechts) & P6 | S ➔ P4 (Links) & P1 | M ➔ P3 & P5'
                            : 'RH ➔ P4 (Links) & P6 | S ➔ P2 (Rechts) & P1 | M ➔ P3 & P5'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer bg-light py-2 px-3 small d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="text-muted fw-bold">🪑 Wisselspelers (Bank):</span>
              <span>
                <strong className="text-primary">Alixe</strong> (RH) •{' '}
                <strong className="text-success">Frieke</strong> (M) •{' '}
                <strong className="text-primary">Anna</strong> (RH)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
