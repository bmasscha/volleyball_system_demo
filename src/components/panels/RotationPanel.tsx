import React from 'react';
import { Paper, Stack, Title, Text, Group, Badge } from '@mantine/core';

interface RotationPanelProps {
  assignments: (string | null)[];
}

const POSITION_COLORS = ['#f87171', '#fb923c', '#facc15', '#34d399', '#2dd4bf', '#60a5fa'];

const RotationPanel: React.FC<RotationPanelProps> = ({ assignments }) => {
  return (
    <Paper shadow="xs" p="md">
      <Title order={4} style={{ marginBottom: 8 }}>Current Rotation</Title>
      <Stack style={{ gap: 8 }}>
        {assignments.map((player, idx) => (
          <Group key={idx} style ={{ gap:8}}>
            <Badge color={POSITION_COLORS[idx]} variant="filled">
              Pos {idx + 1}
            </Badge>
            <Text>{player || <em style={{ color: '#999' }}>(empty)</em>}</Text>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
};

export default RotationPanel;
