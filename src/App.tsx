import React, { useState } from 'react';
import Court from './components/court/Court';
import 'bootstrap/dist/css/bootstrap.min.css';

const POSITIONS = ['OH1', 'L', 'OH2', 'OP', 'MB', 'S'];

const ROTATION_COORDS: { x: number; y: number }[][] = [
  [
    { x: 130, y: 240 },
    { x: 300, y: 280 },
    { x: 450, y: 280 },
    { x: 90, y: 130 },
    { x: 130, y: 80 },
    { x: 520, y: 290 },
  ],
  [
    { x: 130, y: 240 },
    { x: 300, y: 280 },
    { x: 450, y: 280 },
    { x: 470, y: 110 },
    { x: 515, y: 140 },
    { x: 430, y: 65 },
  ],
  [
    { x: 140, y: 190 },
    { x: 260, y: 220 },
    { x: 370, y: 220 },
    { x: 120, y: 110 },
    { x: 160, y: 70 },
    { x: 460, y: 220 },
  ],
  [
    { x: 160, y: 180 },
    { x: 280, y: 210 },
    { x: 380, y: 210 },
    { x: 140, y: 100 },
    { x: 180, y: 60 },
    { x: 480, y: 210 },
  ],
  [
    { x: 180, y: 170 },
    { x: 300, y: 200 },
    { x: 390, y: 200 },
    { x: 160, y: 90 },
    { x: 200, y: 50 },
    { x: 500, y: 200 },
  ],
  [
    { x: 200, y: 160 },
    { x: 320, y: 190 },
    { x: 400, y: 190 },
    { x: 180, y: 80 },
    { x: 220, y: 40 },
    { x: 520, y: 190 },
  ],
];

const POSITION_COLORS = ['#f87171', '#34d399', '#60a5fa', '#facc15', '#fb923c', '#2dd4bf'];

interface Assignment {
  position: string;
  player: string;
}

const DEFAULT_ASSIGNMENTS: Assignment[] = POSITIONS.map((pos) => ({ position: pos, player: '' }));

export default function App() {
  const [assignments, setAssignments] = useState(DEFAULT_ASSIGNMENTS);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [newPlayer, setNewPlayer] = useState('');
  const [roster, setRoster] = useState<string[]>([]);

  const handleAddPlayer = () => {
    if (!newPlayer) return;
    setRoster([...roster, newPlayer]);
    setNewPlayer('');
  };

  const handleAssign = (index: number) => {
    const player = prompt(`Assign which player to ${POSITIONS[index]}?`, assignments[index].player || '');
    if (player !== null) {
      const updated = [...assignments];
      updated[index].player = player;
      setAssignments(updated);
      if (!roster.includes(player)) {
        setRoster([...roster, player]);
      }
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Welcome, Dario</h2>

      {/* Add player to roster */}
      <div className="card mb-3 p-3 shadow-sm">
        <div className="input-group">
          <input
            type="text"
            placeholder="Add player to roster for today"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            className="form-control"
          />
          <button onClick={handleAddPlayer} className="btn btn-primary">
            Add
          </button>
        </div>
        {roster.length > 0 && (
          <small className="alert mt-2 d-block">
            Roster: {roster.join(', ')}
          </small>
        )}
      </div>

      {/* Rotation buttons */}
      <div className="card mb-3 p-3 shadow-sm">
        <div className="row g-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div className="col-4 col-sm-2" key={i}>
              <button
                onClick={() => setCurrentRotation(i)}
                className={`btn w-100 ${currentRotation === i ? 'btn-primary' : 'btn-outline-secondary'}`}
              >
                Rotation {i + 1}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Court */}
      <div className="card mb-3 p-3 shadow-sm overflow-auto">
        <Court
          positions={POSITIONS}
          coords={ROTATION_COORDS[currentRotation]}
          assignments={assignments}
          onCircleClick={handleAssign}
        />
      </div>

      {/* Roster display */}
      <div className="card p-3 shadow-sm">
        <h5>Roster</h5>
        <hr />
        {assignments.map((a, idx) => (
          <div key={idx} style={{ color: POSITION_COLORS[idx] }}>
            <strong>{a.position}:</strong> {a.player || '(empty)'}
          </div>
        ))}
      </div>
    </div>
  );
}
