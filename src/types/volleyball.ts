export type PlayerRole = 'S1' | 'OH1' | 'MB1' | 'S2' | 'OH2' | 'MB2';

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
  rotationNumber: number; // 1 to 6
  activeSetterRole: PlayerRole; // S1 or S2
  activeSetterZone: 'P1' | 'P6' | 'P5';
  title: string;
  description: string;
  // Starting zones (P1, P2, P3, P4, P5, P6) occupied by player roles
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
