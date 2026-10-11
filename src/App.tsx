import React, { useState, useEffect } from 'react';
import Court from './components/court/Court';
import RotationPanel from './components/panels/RotationPanel';
import RosterPanel from './components/panels/RosterPanel';
import { PlayerRole, CourtPhase } from './types/volleyball';
import { ROTATIONS_DATA, ROLE_INFO } from './data/volleyballSystemData';
import 'bootstrap/dist/css/bootstrap.min.css';

const DEFAULT_PLAYER_NAMES: Record<PlayerRole, string> = {
  S1: 'Juna',
  OH1: 'Madelein',
  MB1: 'Elisa',
  S2: 'Sil',
  OH2: 'Kaat',
  MB2: 'Jinte',
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

  // Auto-transition demonstration for kids
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setTimeout(() => {
        setPhase((prev) => (prev === 'receive' ? 'base' : 'receive'));
      }, 2000);
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
      `Assign player name for ${ROLE_INFO[role].title} (${role}):`,
      currentName
    );
    if (newName !== null && newName.trim() !== '') {
      handleUpdatePlayer(role, newName.trim());
      handleAddRosterPlayer(newName.trim());
    }
  };

  const currentConfig = ROTATIONS_DATA[currentRotation];

  return (
    <div className="bg-light min-vh-100 py-3 py-md-4">
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
                  <h1 className="h3 mb-0 fw-bold">Youth Volleyball 6-2 System</h1>
                </div>
                <p className="mb-0 text-white-50 small mt-1">
                  Youth team rotation visualizer without libero • 2 Setters penetrate from P1, P6 & P5 • OH to P4 & P6 • MB to P3 & P5 • Setters to P2 & P1
                </p>
              </div>

              {/* View mode toggle */}
              <div className="btn-group bg-white p-1 rounded-3 shadow-sm align-self-start align-self-md-auto">
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'court' ? 'btn-primary' : 'btn-light text-dark'}`}
                  onClick={() => setActiveTab('court')}
                >
                  🏟️ Court View
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'roster' ? 'btn-primary' : 'btn-light text-dark'}`}
                  onClick={() => setActiveTab('roster')}
                >
                  👥 Team Roster
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeTab === 'reference' ? 'btn-primary' : 'btn-light text-dark'}`}
                  onClick={() => setActiveTab('reference')}
                >
                  📋 Cheat Sheet
                </button>
              </div>
            </div>
          </div>

          {/* Rotation Selector Bar */}
          <div className="bg-white p-3 border-top">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
              <span className="fw-bold small text-secondary text-uppercase letter-spacing">
                Select Rotation (1 - 6):
              </span>
              <span className="badge bg-light text-dark border">
                Active Setter: <strong className="text-warning-emphasis">{currentConfig.activeSetterRole}</strong> ({playerNames[currentConfig.activeSetterRole]}) in <strong className="text-primary">{currentConfig.activeSetterZone}</strong>
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
                        <strong className="d-block">Rot {rot.rotationNumber}</strong>
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
                        Setter: {rot.activeSetterRole} ({setterName})
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </header>

        {/* Tab 1: Court View */}
        {activeTab === 'court' && (
          <div className="row g-3">
            {/* Left Column: Court & Play Controls */}
            <div className="col-12 col-lg-7">
              <div className="card shadow-sm border-0 mb-3">
                {/* Court Phase Selector Header */}
                <div className="card-header bg-white py-2 px-3 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div className="btn-group btn-group-sm">
                    <button
                      type="button"
                      className={`btn ${phase === 'receive' ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setPhase('receive')}
                    >
                      🏐 1. Serve Receive (Passing)
                    </button>
                    <button
                      type="button"
                      className={`btn ${phase === 'base' ? 'btn-success' : 'btn-outline-secondary'}`}
                      onClick={() => setPhase('base')}
                    >
                      🛡️ 2. After Passing (Base)
                    </button>
                    <button
                      type="button"
                      className={`btn ${phase === 'serve' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                      onClick={() => setPhase('serve')}
                    >
                      🎯 Our Serve
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
                        Arrows
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
                        Overlap Guide
                      </label>
                    </div>

                    <button
                      type="button"
                      className={`btn btn-xs btn-sm ${isAnimating ? 'btn-danger' : 'btn-outline-primary'}`}
                      onClick={() => setIsAnimating(!isAnimating)}
                      title="Loop transition animation between Receive and Base"
                    >
                      {isAnimating ? '⏸ Stop' : '▶ Animate'}
                    </button>
                  </div>
                </div>

                {/* Court Component */}
                <div className="card-body p-2 p-md-3 bg-dark rounded-bottom">
                  <Court
                    currentRotation={currentRotation}
                    phase={phase}
                    playerNames={playerNames}
                    showArrows={showArrows}
                    showCrossingLines={showCrossingLines}
                    onCircleClick={handleCircleClick}
                  />

                  {/* Interactive hint */}
                  <div className="d-flex justify-content-between align-items-center text-white-50 small mt-2 px-2">
                    <span>💡 <em>Click any player circle to change player name</em></span>
                    <span className="badge bg-warning text-dark">★ = Active Setter</span>
                  </div>
                </div>
              </div>

              {/* Quick Visual Position Summary */}
              <div className="card shadow-sm border-0 p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0 text-dark">
                    Where Everyone Goes After Passing (Base / Attack Positions):
                  </h6>
                  {(currentRotation === 0 || currentRotation === 3) && (
                    <span className="badge bg-info-subtle text-info-emphasis border">
                      ★ Rot {currentRotation + 1}: OH attacks Right (P2), Setter attacks Left (P4)
                    </span>
                  )}
                </div>
                <div className="row g-2 text-center small">
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-primary-subtle">
                      <div className="text-muted fw-semibold">Left Front (P4)</div>
                      <strong className="text-primary">
                        {currentRotation === 0 || currentRotation === 3 ? 'Setter (Opposite)' : 'Outside Hitter (OH)'}
                      </strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-success-subtle">
                      <div className="text-muted fw-semibold">Middle Front (P3)</div>
                      <strong className="text-success">Middle Blocker (MB)</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-warning-subtle">
                      <div className="text-muted fw-semibold">Right Front (P2)</div>
                      <strong className="text-warning-emphasis">
                        {currentRotation === 0 || currentRotation === 3 ? 'Outside Hitter (OH)' : 'Setter - Attacker'}
                      </strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-success-subtle">
                      <div className="text-muted fw-semibold">Left Back (P5)</div>
                      <strong className="text-success">Middle Blocker (MB)</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-primary-subtle">
                      <div className="text-muted fw-semibold">Middle Back (P6)</div>
                      <strong className="text-primary">Outside Hitter (OH)</strong>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-2 rounded bg-light border border-warning-subtle">
                      <div className="text-muted fw-semibold">Right Back (P1)</div>
                      <strong className="text-warning-emphasis">Setter (S) - Defense</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Rotation Tasks */}
            <div className="col-12 col-lg-5">
              <RotationPanel
                currentRotation={currentRotation}
                phase={phase}
                playerNames={playerNames}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Roster Panel */}
        {activeTab === 'roster' && (
          <RosterPanel
            playerNames={playerNames}
            onUpdatePlayer={handleUpdatePlayer}
            rosterList={rosterPool}
            onAddRosterPlayer={handleAddRosterPlayer}
            onRemoveRosterPlayer={handleRemoveRosterPlayer}
          />
        )}

        {/* Tab 3: Complete 6-Rotation Cheat Sheet */}
        {activeTab === 'reference' && (
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-header bg-white py-3 border-bottom">
              <h5 className="mb-0 fw-bold text-dark">📋 Youth 6-2 System Cheat Sheet</h5>
              <p className="text-muted small mb-0">
                Summary of all 6 rotations for coaches and kids
              </p>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Rotation</th>
                    <th>Active Setter</th>
                    <th>Front Row (Attackers)</th>
                    <th>Back Row (Passers & Defense)</th>
                    <th>Transition After Pass</th>
                  </tr>
                </thead>
                <tbody>
                  {ROTATIONS_DATA.map((r) => (
                    <tr
                      key={r.rotationNumber}
                      className={r.rotationNumber === currentRotation + 1 ? 'table-primary' : ''}
                    >
                      <td className="fw-bold">
                        Rotation {r.rotationNumber}
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
                            ? 'OH ➔ P2 (Right) & P6 | Setter ➔ P4 (Left) & P1 | MB ➔ P3 & P5'
                            : 'OH ➔ P4 (Left) & P6 | Setter ➔ P2 (Right) & P1 | MB ➔ P3 & P5'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer bg-light py-2 px-3 small d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="text-muted fw-bold">🪑 Bench Substitutes:</span>
              <span>
                <strong className="text-primary">Alixe</strong> (OH) •{' '}
                <strong className="text-success">Frieke</strong> (MB) •{' '}
                <strong className="text-primary">Anna</strong> (OH)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
