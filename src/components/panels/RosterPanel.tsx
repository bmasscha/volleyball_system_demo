import React, { useState } from 'react';
import { PlayerRole } from '../../types/volleyball';
import { ROLE_INFO } from '../../data/volleyballSystemData';

interface BenchPlayer {
  name: string;
  position: string;
  suggestedRoles: PlayerRole[];
}

const DEFAULT_BENCH: BenchPlayer[] = [
  { name: 'Alixe', position: 'RH (Receptie-hoek)', suggestedRoles: ['RH1', 'RH2'] },
  { name: 'Frieke', position: 'M (Midden-speler)', suggestedRoles: ['M1', 'M2'] },
  { name: 'Anna', position: 'RH (Receptie-hoek)', suggestedRoles: ['RH1', 'RH2'] },
];

interface RosterPanelProps {
  playerNames: Record<PlayerRole, string>;
  onUpdatePlayer: (role: PlayerRole, newName: string) => void;
  rosterList: string[];
  onAddRosterPlayer: (name: string) => void;
  onRemoveRosterPlayer: (name: string) => void;
}

const RosterPanel: React.FC<RosterPanelProps> = ({
  playerNames,
  onUpdatePlayer,
  rosterList,
  onAddRosterPlayer,
  onRemoveRosterPlayer,
}) => {
  const [newKidName, setNewKidName] = useState('');
  const [selectedRole, setSelectedRole] = useState<PlayerRole>('S1');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKidName.trim()) return;
    onAddRosterPlayer(newKidName.trim());
    setNewKidName('');
  };

  const roles: PlayerRole[] = ['S1', 'RH1', 'M1', 'S2', 'RH2', 'M2'];

  return (
    <div className="card shadow-sm border-0 mb-3">
      <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 fw-bold text-dark">
            👥 Team Opstelling & Spelerslijst
          </h5>
          <span className="text-muted small">6 Basisspelers + 3 Wisselspelers (Bank)</span>
        </div>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
          6-2 Systeem (Zonder libero)
        </span>
      </div>

      <div className="card-body">
        {/* Basisopstelling 6 spelers */}
        <h6 className="fw-bold text-secondary mb-2 small text-uppercase letter-spacing">
          Basisopstelling op het veld
        </h6>
        <div className="row g-2 mb-3">
          {roles.map((role) => {
            const info = ROLE_INFO[role];
            return (
              <div key={role} className="col-12 col-md-6 col-lg-4">
                <div
                  className="p-2 rounded border d-flex align-items-center gap-2"
                  style={{ backgroundColor: info.bg, borderColor: `${info.color}40` }}
                >
                  <span
                    className="badge fw-bold"
                    style={{ backgroundColor: info.color, color: '#fff', minWidth: '46px' }}
                  >
                    {role}
                  </span>
                  <div className="flex-grow-1">
                    <div className="small fw-semibold text-muted lh-1 mb-1">{info.title}</div>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-white fw-bold"
                      placeholder={`Naam voor ${role}`}
                      value={playerNames[role]}
                      onChange={(e) => onUpdatePlayer(role, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <hr className="my-3 text-muted" />

        {/* Wisselspelers (Bank) */}
        <h6 className="fw-bold text-secondary mb-2 small text-uppercase letter-spacing">
          🪑 Wisselspelers (Bank)
        </h6>
        <div className="row g-2 mb-3">
          {DEFAULT_BENCH.map((bench) => (
            <div key={bench.name} className="col-12 col-md-4">
              <div className="p-3 rounded border bg-light">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <strong className="text-dark fs-6">{bench.name}</strong>
                  <span className="badge bg-secondary-subtle text-secondary border">
                    {bench.position}
                  </span>
                </div>
                <div className="small text-muted mb-2">
                  Wissel in op het veld:
                </div>
                <div className="d-flex gap-1 flex-wrap">
                  {bench.suggestedRoles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      className="btn btn-xs btn-outline-primary"
                      onClick={() => onUpdatePlayer(role, bench.name)}
                      title={`Wissel ${bench.name} in voor ${role} (${playerNames[role]})`}
                    >
                      ⇄ Wissel voor {role} ({playerNames[role]})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-3 text-muted" />

        {/* Spelersgroep toevoegen / beheren */}
        <h6 className="fw-bold text-secondary mb-2 small text-uppercase letter-spacing">
          Alle Spelers van het Team
        </h6>

        <form onSubmit={handleAdd} className="input-group mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Voeg een speler toe aan de groep..."
            value={newKidName}
            onChange={(e) => setNewKidName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-3">
            + Toevoegen
          </button>
        </form>

        {/* Snel toewijzen */}
        <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
          <span className="small text-muted fw-semibold">Wijs toe aan veldpositie:</span>
          <select
            className="form-select form-select-sm w-auto"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as PlayerRole)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r} ({ROLE_INFO[r].title}) - momenteel {playerNames[r]}
              </option>
            ))}
          </select>
          <span className="small text-muted">(Klik hieronder op een speler om toe te wijzen aan {selectedRole})</span>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {rosterList.map((kid) => {
            const isCurrentlyStarting = Object.values(playerNames).includes(kid);
            const startingRole = (Object.keys(playerNames) as PlayerRole[]).find(
              (r) => playerNames[r] === kid
            );

            return (
              <div key={kid} className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className={`btn ${isCurrentlyStarting ? 'btn-primary' : 'btn-outline-secondary'}`}
                  title={`Wijs ${kid} toe aan ${selectedRole}`}
                  onClick={() => onUpdatePlayer(selectedRole, kid)}
                >
                  {kid} {isCurrentlyStarting ? `(${startingRole})` : ''}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  title={`Verwijder ${kid}`}
                  onClick={() => onRemoveRosterPlayer(kid)}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RosterPanel;
