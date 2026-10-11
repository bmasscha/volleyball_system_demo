import { RotationConfig, PlayerRole, PositionPoint } from '../types/volleyball';

export const ROLE_INFO: Record<PlayerRole, { name: string; title: string; color: string; bg: string }> = {
  S1: { name: 'Setter 1', title: 'Setter 1', color: '#d97706', bg: '#fef3c7' },
  S2: { name: 'Setter 2', title: 'Setter 2', color: '#b45309', bg: '#fde68a' },
  OH1: { name: 'Outside 1', title: 'Outside Hitter 1', color: '#2563eb', bg: '#dbeafe' },
  OH2: { name: 'Outside 2', title: 'Outside Hitter 2', color: '#1d4ed8', bg: '#bfdbfe' },
  MB1: { name: 'Middle 1', title: 'Middle Blocker 1', color: '#059669', bg: '#d1fae5' },
  MB2: { name: 'Middle 2', title: 'Middle Blocker 2', color: '#047857', bg: '#a7f3d0' },
};

// Target location where the active setter runs to set (near net, between Zone 2 and Zone 3)
export const SETTING_TARGET: PositionPoint = { x: 390, y: 70 };

export const ROTATIONS_DATA: RotationConfig[] = [
  // ==========================================
  // ROTATION 1: S1 in P1 (Back Right)
  // 3 Passers on line: OH2 (180, 280), MB2 (300, 280), OH1 (420, 270)
  // 2 at 3m line for short serves: S2 (140, 160), MB1 (280, 160)
  // Active Setter: S1 (470, 310) behind OH1 (270)
  // ==========================================
  {
    rotationNumber: 1,
    activeSetterRole: 'S1',
    activeSetterZone: 'P1',
    title: 'Rotation 1 (Setter 1 in P1)',
    description: 'S1 sets from P1. 3 Passers (OH2, MB2, OH1) spread evenly. S2 & MB1 at 3m line for short serves.',
    zoneOrder: {
      p1: 'S1',
      p2: 'OH1',
      p3: 'MB1',
      p4: 'S2',
      p5: 'OH2',
      p6: 'MB2',
    },
    passerRoles: ['OH2', 'MB2', 'OH1'],
    shortServeRoles: ['S2', 'MB1'],
    receivePositions: {
      // 2 players at 3m line catching short serves
      S2: { x: 140, y: 160 },   // P4 at 3m line left
      MB1: { x: 280, y: 160 },  // P3 at 3m line middle
      // 3 primary passers evenly spaced across width on a line (x=180, 300, 420)
      OH2: { x: 180, y: 280 },  // P5 left passer
      MB2: { x: 300, y: 280 },  // P6 middle passer
      OH1: { x: 420, y: 270 },  // P2 right passer (in front of S1 at y=310!)
      // Active setter tucked behind right passer
      S1: { x: 470, y: 310 },   // P1 BEHIND OH1 (y=310 > y=270), sprints to net target!
    },
    basePositions: {
      // Front row: OH1 attacks right (P2), MB1 middle (P3), S2 attacks left (P4)
      OH1: { x: 450, y: 105 }, // OH1 attacks right-side at Right Front (P2)
      MB1: { x: 300, y: 95 },  // MB1 stays P3 (Middle Front)
      S2: { x: 150, y: 105 },  // S2 attacks outside at Left Front (P4)
      // Back row: MB to P5, OH to P6, S to P1
      MB2: { x: 150, y: 290 }, // MB2 switches from P6 to P5 (Left Back)
      OH2: { x: 300, y: 325 }, // OH2 switches from P5 to P6 (Middle Back)
      S1: { x: 450, y: 290 },  // S1 sets at target, then defends P1 (Right Back)
    },
    servePositions: {
      S1: { x: 460, y: 430 },  // S1 serving behind endline at P1
      S2: { x: 150, y: 105 },  // S2 ready at Left Front (P4)
      MB1: { x: 300, y: 95 },  // MB1 at P3 (Middle Front)
      OH1: { x: 450, y: 105 }, // OH1 ready at Right Front (P2)
      MB2: { x: 150, y: 290 }, // MB2 at Left Back (P5)
      OH2: { x: 300, y: 325 }, // OH2 at Middle Back (P6)
    },
    playerInstructions: {
      S1: 'Active Setter! Stay behind OH1 (y=310 vs y=270) until serve contact. Sprint up the right sideline to net target.',
      OH1: 'Primary Passer (Right)! Stay in front of S1 on the passing line. Pass right seam, then attack right at P2.',
      OH2: 'Primary Passer (Left)! Evenly spaced on the passing line at x=180. Pass left seam, transition to P6.',
      MB2: 'Primary Passer (Center)! Evenly spaced at center x=300 on passing line. Pass center, transition to P5.',
      S2: 'Short-Serve Guard! Positioned at 3m line (x=140, y=160) to catch short serves. Attack outside at Left Front (P4).',
      MB1: 'Short-Serve Guard! Positioned at 3m line (x=280, y=160) to catch short serves. Attack at Middle Front (P3).',
    },
  },

  // ==========================================
  // ROTATION 2: S1 in P6 (Back Middle)
  // 3 Passers on line: OH2 (180, 280), MB2 (300, 295), OH1 (420, 290)
  // 2 at 3m line for short serves: S2 (360, 160), MB1 (460, 155)
  // Active Setter: S1 (360, 190) behind S2 (160), between MB2 and OH1
  // ==========================================
  {
    rotationNumber: 2,
    activeSetterRole: 'S1',
    activeSetterZone: 'P6',
    title: 'Rotation 2 (Setter 1 in P6)',
    description: 'S1 sets from P6. 3 Passers (OH2, MB2, OH1) spread evenly. S2 & MB1 at 3m line for short serves.',
    zoneOrder: {
      p1: 'OH1',
      p2: 'MB1',
      p3: 'S2',
      p4: 'OH2',
      p5: 'MB2',
      p6: 'S1',
    },
    passerRoles: ['OH2', 'MB2', 'OH1'],
    shortServeRoles: ['S2', 'MB1'],
    receivePositions: {
      // 2 players at 3m line catching short serves
      S2: { x: 360, y: 160 },   // P3 at 3m line middle-right
      MB1: { x: 460, y: 155 },  // P2 at 3m line right (legally right of S2)
      // Active setter tucked behind S2
      S1: { x: 360, y: 190 },   // P6 behind S2 (y=190 > y=160) and between MB2 & OH1!
      // 3 primary passers evenly spaced across width on a line (x=180, 300, 420)
      OH2: { x: 180, y: 280 },  // P4 left passer (in front of MB2 at y=295!)
      MB2: { x: 300, y: 295 },  // P5 center passer (behind OH2, left of S1)
      OH1: { x: 420, y: 290 },  // P1 right passer (right of S1)
    },
    basePositions: {
      // Front row: OH to P4, MB to P3, S to P2
      OH2: { x: 150, y: 105 }, // OH2 already front-left, attacks at P4
      MB1: { x: 300, y: 95 },  // MB1 switches from P2 to P3 (Middle Front)
      S2: { x: 450, y: 105 },  // S2 switches from P3 to P2 (Right Front)
      // Back row: MB to P5, OH to P6, S to P1
      MB2: { x: 150, y: 290 }, // MB2 already on left, stays P5 (Left Back)
      OH1: { x: 300, y: 325 }, // OH1 moves from P1 to P6 (Middle Back)
      S1: { x: 450, y: 290 },  // S1 sets at net, then plays defense at P1 (Right Back)
    },
    servePositions: {
      OH1: { x: 460, y: 430 }, // OH1 serving behind endline at P1
      OH2: { x: 150, y: 105 }, // OH2 at Left Front (P4)
      MB1: { x: 300, y: 95 },  // MB1 at Middle Front (P3)
      S2: { x: 450, y: 105 },  // S2 at Right Front (P2)
      MB2: { x: 150, y: 290 }, // MB2 at Left Back (P5)
      S1: { x: 450, y: 290 },  // S1 at Right Back (P1) defense
    },
    playerInstructions: {
      S1: 'Active Setter! Stack behind S2 at 3m line (y=190 vs y=160). Sprint straight up to net target to set.',
      OH2: 'Primary Passer (Left)! Drop back to x=180 on passing line (stay in front of MB2!). Attack at Left Front (P4).',
      MB2: 'Primary Passer (Center)! Evenly spaced at center x=300 on passing line. Stay Left Back (P5) on defense.',
      OH1: 'Primary Passer (Right)! Evenly spaced at right x=420 on passing line. Transition to Middle Back (P6).',
      S2: 'Short-Serve Guard! Guard 3m line (x=360, y=160) for short serves in front of setter S1. Slide to Right Front (P2).',
      MB1: 'Short-Serve Guard! Guard 3m line right (x=460, y=155). Switch to Middle Front (P3) to attack and block.',
    },
  },

  // ==========================================
  // ROTATION 3: S1 in P5 (Back Left)
  // 3 Passers on line: OH2 (180, 280), OH1 (300, 290), MB1 (420, 290)
  // 2 at 3m line for short serves: MB2 (130, 155), S2 (460, 160)
  // Active Setter: S1 (130, 190) behind MB2 (155), left of OH1 (300)
  // ==========================================
  {
    rotationNumber: 3,
    activeSetterRole: 'S1',
    activeSetterZone: 'P5',
    title: 'Rotation 3 (Setter 1 in P5)',
    description: 'S1 sets from P5. 3 Passers (OH2, OH1, MB1) spread evenly. MB2 & S2 at 3m line for short serves.',
    zoneOrder: {
      p1: 'MB1',
      p2: 'S2',
      p3: 'OH2',
      p4: 'MB2',
      p5: 'S1',
      p6: 'OH1',
    },
    passerRoles: ['OH2', 'OH1', 'MB1'],
    shortServeRoles: ['MB2', 'S2'],
    receivePositions: {
      // 2 players at 3m line catching short serves
      MB2: { x: 130, y: 155 },  // P4 at 3m line left
      S2: { x: 460, y: 160 },   // P2 at 3m line right
      // Active setter tucked behind MB2
      S1: { x: 130, y: 190 },   // P5 behind MB2 (y=190 > y=155) and left of OH1! Runs along 3m line!
      // 3 primary passers evenly spaced across width on a line (x=180, 300, 420)
      OH2: { x: 180, y: 280 },  // P3 left passer (in front of OH1 at y=290, right of MB2)
      OH1: { x: 300, y: 290 },  // P6 center passer
      MB1: { x: 420, y: 290 },  // P1 right passer (behind S2 at y=160)
    },
    basePositions: {
      // Front row: OH to P4, MB to P3, S to P2
      OH2: { x: 150, y: 105 }, // OH2 transitions to P4 (Left Front)
      MB2: { x: 300, y: 95 },  // MB2 transitions to P3 (Middle Front)
      S2: { x: 450, y: 105 },  // S2 stays P2 (Right Front)
      // Back row: MB to P5, OH to P6, S to P1
      MB1: { x: 150, y: 290 }, // MB1 transitions across to P5 (Left Back)
      OH1: { x: 300, y: 325 }, // OH1 stays P6 (Middle Back)
      S1: { x: 450, y: 290 },  // S1 sets at target, then defends P1 (Right Back)
    },
    servePositions: {
      MB1: { x: 460, y: 430 }, // MB1 serving behind endline at P1
      OH2: { x: 150, y: 105 }, // OH2 at Left Front (P4)
      MB2: { x: 300, y: 95 },  // MB2 at Middle Front (P3)
      S2: { x: 450, y: 105 },  // S2 at Right Front (P2)
      OH1: { x: 300, y: 325 }, // OH1 at Middle Back (P6)
      S1: { x: 450, y: 290 },  // S1 already at Right Back (P1) for defense!
    },
    playerInstructions: {
      S1: 'Active Setter! Stack behind MB2 at 3m line (y=190 vs y=155). Sprint along the 3m line up to net target.',
      OH2: 'Primary Passer (Left)! Drop back to x=180 on passing line (in front of OH1!). Attack at Left Front (P4).',
      OH1: 'Primary Passer (Center)! Evenly spaced at center x=300 on passing line. Remain Middle Back (P6) on defense.',
      MB1: 'Primary Passer (Right)! Evenly spaced at right x=420 on passing line. Transition across to Left Back (P5).',
      MB2: 'Short-Serve Guard! Guard 3m line left (x=130, y=155) in front of setter S1. Slide to Middle Front (P3) to attack.',
      S2: 'Short-Serve Guard! Guard 3m line right (x=460, y=160). Stay at Right Front (P2) to attack and block.',
    },
  },

  // ==========================================
  // ROTATION 4: S2 in P1 (Back Right)
  // Mirror of Rotation 1 with Setter 2 setting
  // 3 Passers on line: OH1 (180, 280), MB1 (300, 280), OH2 (420, 270)
  // 2 at 3m line for short serves: S1 (140, 160), MB2 (280, 160)
  // Active Setter: S2 (470, 310) behind OH2 (270)
  // ==========================================
  {
    rotationNumber: 4,
    activeSetterRole: 'S2',
    activeSetterZone: 'P1',
    title: 'Rotation 4 (Setter 2 in P1)',
    description: 'S2 sets from P1. 3 Passers (OH1, MB1, OH2) spread evenly. S1 & MB2 at 3m line for short serves.',
    zoneOrder: {
      p1: 'S2',
      p2: 'OH2',
      p3: 'MB2',
      p4: 'S1',
      p5: 'OH1',
      p6: 'MB1',
    },
    passerRoles: ['OH1', 'MB1', 'OH2'],
    shortServeRoles: ['S1', 'MB2'],
    receivePositions: {
      // 2 players at 3m line catching short serves
      S1: { x: 140, y: 160 },   // P4 at 3m line left
      MB2: { x: 280, y: 160 },  // P3 at 3m line middle
      // 3 primary passers evenly spaced across width on a line (x=180, 300, 420)
      OH1: { x: 180, y: 280 },  // P5 left passer
      MB1: { x: 300, y: 280 },  // P6 middle passer
      OH2: { x: 420, y: 270 },  // P2 right passer (in front of S2 at y=310!)
      // Active setter tucked behind right passer
      S2: { x: 470, y: 310 },   // P1 BEHIND OH2 (y=310 > y=270), sprints to net target!
    },
    basePositions: {
      // Front row: OH2 attacks right (P2), MB2 middle (P3), S1 attacks left (P4)
      OH2: { x: 450, y: 105 }, // OH2 attacks right-side at Right Front (P2)
      MB2: { x: 300, y: 95 },  // MB2 stays P3 (Middle Front)
      S1: { x: 150, y: 105 },  // S1 attacks outside at Left Front (P4)
      // Back row: MB to P5, OH to P6, S to P1
      MB1: { x: 150, y: 290 }, // MB1 switches to P5 (Left Back)
      OH1: { x: 300, y: 325 }, // OH1 switches to P6 (Middle Back)
      S2: { x: 450, y: 290 },  // S2 sets at target, then defends P1 (Right Back)
    },
    servePositions: {
      S2: { x: 460, y: 430 },  // S2 serving behind endline at P1
      S1: { x: 150, y: 105 },  // S1 ready at Left Front (P4)
      MB2: { x: 300, y: 95 },  // MB2 at P3 (Middle Front)
      OH2: { x: 450, y: 105 }, // OH2 ready at Right Front (P2)
      MB1: { x: 150, y: 290 }, // MB1 at Left Back (P5)
      OH1: { x: 300, y: 325 }, // OH1 at Middle Back (P6)
    },
    playerInstructions: {
      S2: 'Active Setter! Stay behind OH2 (y=310 vs y=270) until serve contact. Sprint up the right sideline to net target.',
      OH2: 'Primary Passer (Right)! Stay in front of S2 on the passing line. Pass right seam, then attack right at P2.',
      OH1: 'Primary Passer (Left)! Evenly spaced on the passing line at x=180. Pass left seam, transition to P6.',
      MB1: 'Primary Passer (Center)! Evenly spaced at center x=300 on passing line. Pass center, transition to P5.',
      S1: 'Short-Serve Guard! Positioned at 3m line (x=140, y=160) to catch short serves. Attack outside at Left Front (P4).',
      MB2: 'Short-Serve Guard! Positioned at 3m line (x=280, y=160) to catch short serves. Attack at Middle Front (P3).',
    },
  },

  // ==========================================
  // ROTATION 5: S2 in P6 (Back Middle)
  // Mirror of Rotation 2 with Setter 2 setting
  // 3 Passers on line: OH1 (180, 280), MB1 (300, 295), OH2 (420, 290)
  // 2 at 3m line for short serves: S1 (360, 160), MB2 (460, 155)
  // Active Setter: S2 (360, 190) behind S1 (160), between MB1 and OH2
  // ==========================================
  {
    rotationNumber: 5,
    activeSetterRole: 'S2',
    activeSetterZone: 'P6',
    title: 'Rotation 5 (Setter 2 in P6)',
    description: 'S2 sets from P6. 3 Passers (OH1, MB1, OH2) spread evenly. S1 & MB2 at 3m line for short serves.',
    zoneOrder: {
      p1: 'OH2',
      p2: 'MB2',
      p3: 'S1',
      p4: 'OH1',
      p5: 'MB1',
      p6: 'S2',
    },
    passerRoles: ['OH1', 'MB1', 'OH2'],
    shortServeRoles: ['S1', 'MB2'],
    receivePositions: {
      // 2 players at 3m line catching short serves
      S1: { x: 360, y: 160 },   // P3 at 3m line middle-right
      MB2: { x: 460, y: 155 },  // P2 at 3m line right (legally right of S1)
      // Active setter tucked behind S1
      S2: { x: 360, y: 190 },   // P6 behind S1 (y=190 > y=160) and between MB1 & OH2!
      // 3 primary passers evenly spaced across width on a line (x=180, 300, 420)
      OH1: { x: 180, y: 280 },  // P4 left passer (in front of MB1 at y=295!)
      MB1: { x: 300, y: 295 },  // P5 center passer (behind OH1, left of S2)
      OH2: { x: 420, y: 290 },  // P1 right passer (right of S2)
    },
    basePositions: {
      // Front row: OH to P4, MB to P3, S to P2
      OH1: { x: 150, y: 105 }, // OH1 already front-left, attacks at P4
      MB2: { x: 300, y: 95 },  // MB2 switches from P2 to P3 (Middle Front)
      S1: { x: 450, y: 105 },  // S1 switches from P3 to P2 (Right Front)
      // Back row: MB to P5, OH to P6, S to P1
      MB1: { x: 150, y: 290 }, // MB1 already on left, stays P5 (Left Back)
      OH2: { x: 300, y: 325 }, // OH2 moves from P1 to P6 (Middle Back)
      S2: { x: 450, y: 290 },  // S2 sets at net, then defends P1 (Right Back)
    },
    servePositions: {
      OH2: { x: 460, y: 430 }, // OH2 serving behind endline at P1
      OH1: { x: 150, y: 105 }, // OH1 at Left Front (P4)
      MB2: { x: 300, y: 95 },  // MB2 at Middle Front (P3)
      S1: { x: 450, y: 105 },  // S1 at Right Front (P2)
      MB1: { x: 150, y: 290 }, // MB1 at Left Back (P5)
      S2: { x: 450, y: 290 },  // S2 at Right Back (P1) defense
    },
    playerInstructions: {
      S2: 'Active Setter! Stack behind S1 at 3m line (y=190 vs y=160). Sprint straight up to net target to set.',
      OH1: 'Primary Passer (Left)! Drop back to x=180 on passing line (stay in front of MB1!). Attack at Left Front (P4).',
      MB1: 'Primary Passer (Center)! Evenly spaced at center x=300 on passing line. Stay Left Back (P5) on defense.',
      OH2: 'Primary Passer (Right)! Evenly spaced at right x=420 on passing line. Transition to Middle Back (P6).',
      S1: 'Short-Serve Guard! Guard 3m line (x=360, y=160) for short serves in front of setter S2. Slide to Right Front (P2).',
      MB2: 'Short-Serve Guard! Guard 3m line right (x=460, y=155). Switch to Middle Front (P3) to attack and block.',
    },
  },

  // ==========================================
  // ROTATION 6: S2 in P5 (Back Left)
  // Mirror of Rotation 3 with Setter 2 setting
  // 3 Passers on line: OH1 (180, 280), OH2 (300, 290), MB2 (420, 290)
  // 2 at 3m line for short serves: MB1 (130, 155), S1 (460, 160)
  // Active Setter: S2 (130, 190) behind MB1 (155), left of OH2 (300)
  // ==========================================
  {
    rotationNumber: 6,
    activeSetterRole: 'S2',
    activeSetterZone: 'P5',
    title: 'Rotation 6 (Setter 2 in P5)',
    description: 'S2 sets from P5. 3 Passers (OH1, OH2, MB2) spread evenly. MB1 & S1 at 3m line for short serves.',
    zoneOrder: {
      p1: 'MB2',
      p2: 'S1',
      p3: 'OH1',
      p4: 'MB1',
      p5: 'S2',
      p6: 'OH2',
    },
    passerRoles: ['OH1', 'OH2', 'MB2'],
    shortServeRoles: ['MB1', 'S1'],
    receivePositions: {
      // 2 players at 3m line catching short serves
      MB1: { x: 130, y: 155 },  // P4 at 3m line left
      S1: { x: 460, y: 160 },   // P2 at 3m line right
      // Active setter tucked behind MB1
      S2: { x: 130, y: 190 },   // P5 behind MB1 (y=190 > y=155) and left of OH2! Runs along 3m line!
      // 3 primary passers evenly spaced across width on a line (x=180, 300, 420)
      OH1: { x: 180, y: 280 },  // P3 left passer (in front of OH2 at y=290, right of MB1)
      OH2: { x: 300, y: 290 },  // P6 center passer
      MB2: { x: 420, y: 290 },  // P1 right passer (behind S1 at y=160)
    },
    basePositions: {
      // Front row: OH to P4, MB to P3, S to P2
      OH1: { x: 150, y: 105 }, // OH1 transitions to P4 (Left Front)
      MB1: { x: 300, y: 95 },  // MB1 transitions to P3 (Middle Front)
      S1: { x: 450, y: 105 },  // S1 stays P2 (Right Front)
      // Back row: MB to P5, OH to P6, S to P1
      MB2: { x: 150, y: 290 }, // MB2 transitions across to P5 (Left Back)
      OH2: { x: 300, y: 325 }, // OH2 stays P6 (Middle Back)
      S2: { x: 450, y: 290 },  // S2 sets at target, then defends P1 (Right Back)
    },
    servePositions: {
      MB2: { x: 460, y: 430 }, // MB2 serving behind endline at P1
      OH1: { x: 150, y: 105 }, // OH1 at Left Front (P4)
      MB1: { x: 300, y: 95 },  // MB1 at Middle Front (P3)
      S1: { x: 450, y: 105 },  // S1 at Right Front (P2)
      OH2: { x: 300, y: 325 }, // OH2 at Middle Back (P6)
      S2: { x: 450, y: 290 },  // S2 already at Right Back (P1) for defense!
    },
    playerInstructions: {
      S2: 'Active Setter! Stack behind MB1 at 3m line (y=190 vs y=155). Sprint along 3m line to net target.',
      OH1: 'Primary Passer (Left)! Drop back to x=180 on passing line (in front of OH2!). Attack at Left Front (P4).',
      OH2: 'Primary Passer (Center)! Evenly spaced at center x=300 on passing line. Remain Middle Back (P6) on defense.',
      MB2: 'Primary Passer (Right)! Evenly spaced at right x=420 on passing line. Switch across to Left Back (P5).',
      MB1: 'Short-Serve Guard! Guard 3m line left (x=130, y=155) in front of setter S2. Slide to Middle Front (P3) to attack.',
      S1: 'Short-Serve Guard! Guard 3m line right (x=460, y=160). Stay at Right Front (P2) to attack and block.',
    },
  },
];

export interface OverlapValidationReport {
  isAllValid: boolean;
  p2p1Ok: boolean;
  p3p6Ok: boolean;
  p4p5Ok: boolean;
  frontRowLR: boolean;
  backRowLR: boolean;
  details: string[];
}

export function validateReceiveCrossingRules(config: RotationConfig): OverlapValidationReport {
  const { p1, p2, p3, p4, p5, p6 } = config.zoneOrder;
  const pos = config.receivePositions;

  // Front-to-back checks (lower y is closer to net)
  const p2p1Ok = pos[p2].y < pos[p1].y; // Front P2 closer to net than Back P1
  const p3p6Ok = pos[p3].y < pos[p6].y; // Front P3 closer to net than Back P6
  const p4p5Ok = pos[p4].y < pos[p5].y; // Front P4 closer to net than Back P5

  // Left-to-right checks (lower x is further left)
  const frontRowLR = pos[p4].x < pos[p3].x && pos[p3].x < pos[p2].x;
  const backRowLR = pos[p5].x < pos[p6].x && pos[p6].x < pos[p1].x;

  const isAllValid = p2p1Ok && p3p6Ok && p4p5Ok && frontRowLR && backRowLR;

  const details: string[] = [];
  if (!p2p1Ok) details.push(`FAULT: ${p1} in P1 is in front of or level with ${p2} in P2 (y: ${pos[p1].y} vs ${pos[p2].y})`);
  if (!p3p6Ok) details.push(`FAULT: ${p6} in P6 is in front of or level with ${p3} in P3 (y: ${pos[p6].y} vs ${pos[p3].y})`);
  if (!p4p5Ok) details.push(`FAULT: ${p5} in P5 is in front of or level with ${p4} in P4 (y: ${pos[p5].y} vs ${pos[p4].y})`);
  if (!frontRowLR) details.push(`FAULT: Front row out of left-to-right order (P4: ${pos[p4].x}, P3: ${pos[p3].x}, P2: ${pos[p2].x})`);
  if (!backRowLR) details.push(`FAULT: Back row out of left-to-right order (P5: ${pos[p5].x}, P6: ${pos[p6].x}, P1: ${pos[p1].x})`);

  if (isAllValid) {
    details.push('All front-to-back and left-to-right crossing rules 100% satisfied.');
  }

  return {
    isAllValid,
    p2p1Ok,
    p3p6Ok,
    p4p5Ok,
    frontRowLR,
    backRowLR,
    details,
  };
}
