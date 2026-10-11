export type PlayerRole = 'S1' | 'RH1' | 'M1' | 'S2' | 'RH2' | 'M2';

export interface PlayerAssignment {
  role: PlayerRole;
  name: string;
}

export type CourtPhase = 'receive' | 'base' | 'serve';

export interface PositionPoint {
  x: number;
  y: number;
}

export interface PlayerPhasePosition {
  role: PlayerRole;
  coord: PositionPoint;
  baseCoord: PositionPoint;
  isSetter: boolean;
  notes: string;
}

export interface RotationConfig {
  rotationNumber: number; // 1 t/m 6
  activeSetterRole: PlayerRole; // S1 of S2
  activeSetterZone: 'P1' | 'P6' | 'P5';
  title: string;
  description: string;
  // Startzones (P1, P2, P3, P4, P5, P6) bezet door spelers
  zoneOrder: {
    p1: PlayerRole;
    p2: PlayerRole;
    p3: PlayerRole;
    p4: PlayerRole;
    p5: PlayerRole;
    p6: PlayerRole;
  };
  receivePositions: Record<PlayerRole, PositionPoint>;
  basePositions: Record<PlayerRole, PositionPoint>;
  servePositions: Record<PlayerRole, PositionPoint>;
  playerInstructions: Record<PlayerRole, string>;
  passerRoles: [PlayerRole, PlayerRole, PlayerRole];
  shortServeRoles: [PlayerRole, PlayerRole];
}
