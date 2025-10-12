import React from 'react';
import { Stack, Button } from '@mantine/core';

interface RosterPanelProps {
  players: string[];
  onSelect: (player: string) => void;
  onAddPlayer: (player: string) => void;
  newPlayer: string;
  setNewPlayer: (val: string) => void;
}

const RosterPanel: React.FC<RosterPanelProps> = ({ players, onSelect, onAddPlayer, newPlayer, setNewPlayer }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      <Stack style={{gap:8}}>
        <input
          type="text"
          placeholder="Add new player"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
        />
        <Button onClick={() => { if(newPlayer) { onAddPlayer(newPlayer); setNewPlayer(''); } }}>Add Player</Button>
      </Stack>

      <div style={{ marginTop: 16 }}>
        <strong>Roster:</strong>
        <Stack style={{gap:8}}>
          {players.map((p, idx) => (
            <Button key={idx} variant="outline" size="xs" onClick={() => onSelect(p)}>
              {p}
            </Button>
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default RosterPanel;
