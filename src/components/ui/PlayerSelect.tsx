import React from 'react';
import { Select } from '@mantine/core';

interface PlayerSelectProps {
  players: string[];
  onSelect: (player: string) => void;
}

const PlayerSelect: React.FC<PlayerSelectProps> = ({ players, onSelect }) => {
  return (
    <Select
      data={players}
      placeholder="Pick a player"
      searchable
      onChange={(val) => val && onSelect(val)}
    />
  );
};

export default PlayerSelect;
