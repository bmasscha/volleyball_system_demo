import { RotationConfig, PlayerRole, PositionPoint } from '../types/volleyball';

export const ROLE_INFO: Record<PlayerRole, { name: string; title: string; color: string; bg: string }> = {
  S1: { name: 'Spelverdeler 1', title: 'Spelverdeler 1', color: '#d97706', bg: '#fef3c7' },
  S2: { name: 'Spelverdeler 2', title: 'Spelverdeler 2', color: '#b45309', bg: '#fde68a' },
  RH1: { name: 'Receptie-hoek 1', title: 'Receptie-hoek 1', color: '#2563eb', bg: '#dbeafe' },
  RH2: { name: 'Receptie-hoek 2', title: 'Receptie-hoek 2', color: '#1d4ed8', bg: '#bfdbfe' },
  M1: { name: 'Midden 1', title: 'Midden-speler 1', color: '#059669', bg: '#d1fae5' },
  M2: { name: 'Midden 2', title: 'Midden-speler 2', color: '#047857', bg: '#a7f3d0' },
};

// Doelpositie aan het net waar de actieve spelverdeler naartoe loopt om te passen (tussen P2 en P3)
export const SETTING_TARGET: PositionPoint = { x: 390, y: 70 };

export const ROTATIONS_DATA: RotationConfig[] = [
  // ==========================================
  // ROTATIE 1: S1 in P1 (Rechts-achter)
  // 3 Passers op één lijn: RH2 (180, 280), M2 (300, 280), RH1 (420, 270)
  // 2 aan de 3m-lijn voor korte ballen: S2 (140, 160), M1 (280, 160)
  // Actieve spelverdeler: S1 (470, 310) achter RH1 (270)
  // ==========================================
  {
    rotationNumber: 1,
    activeSetterRole: 'S1',
    activeSetterZone: 'P1',
    title: 'Rotatie 1 (Spelverdeler 1 in P1)',
    description: 'S1 verdeelt vanuit P1. 3 Passers (RH2, M2, RH1) op één lijn. S2 & M1 aan de 3m-lijn voor korte opslag.',
    zoneOrder: {
      p1: 'S1',
      p2: 'RH1',
      p3: 'M1',
      p4: 'S2',
      p5: 'RH2',
      p6: 'M2',
    },
    passerRoles: ['RH2', 'M2', 'RH1'],
    shortServeRoles: ['S2', 'M1'],
    receivePositions: {
      // 2 spelers aan 3m-lijn voor korte opslag
      S2: { x: 140, y: 160 },   // P4 aan 3m-lijn links
      M1: { x: 280, y: 160 },   // P3 aan 3m-lijn midden
      // 3 primaire passers gelijkmatig verdeeld over de breedte (x=180, 300, 420)
      RH2: { x: 180, y: 280 },  // P5 linker passer
      M2: { x: 300, y: 280 },   // P6 midden passer
      RH1: { x: 420, y: 270 },  // P2 rechter passer (voor S1 op y=310!)
      // Actieve spelverdeler achter rechter passer
      S1: { x: 470, y: 310 },   // P1 ACHTER RH1 (y=310 > y=270), sprint naar net!
    },
    basePositions: {
      // Voorste rij: RH1 valt rechts aan (P2), M1 midden (P3), S2 valt links aan (P4)
      RH1: { x: 450, y: 105 }, // RH1 valt rechts aan op Rechts-voor (P2)
      M1: { x: 300, y: 95 },   // M1 blijft Midden-voor (P3)
      S2: { x: 150, y: 105 },  // S2 valt aan op Links-voor (P4)
      // Achterste rij: M naar P5, RH naar P6, S naar P1
      M2: { x: 150, y: 290 },  // M2 schuift van P6 naar P5 (Links-achter)
      RH2: { x: 300, y: 325 }, // RH2 schuift van P5 naar P6 (Midden-achter)
      S1: { x: 450, y: 290 },  // S1 verdeelt aan net, verdedigt daarna Rechts-achter (P1)
    },
    servePositions: {
      S1: { x: 460, y: 430 },  // S1 serveert achter de achterlijn bij P1
      S2: { x: 150, y: 105 },  // S2 klaar op Links-voor (P4)
      M1: { x: 300, y: 95 },   // M1 op Midden-voor (P3)
      RH1: { x: 450, y: 105 }, // RH1 klaar op Rechts-voor (P2)
      M2: { x: 150, y: 290 },  // M2 op Links-achter (P5)
      RH2: { x: 300, y: 325 }, // RH2 op Midden-achter (P6)
    },
    playerInstructions: {
      S1: 'Actieve Spelverdeler! Blijf achter RH1 (y=310 vs y=270) tot het balcontact. Sprint daarna langs de lijn naar het net.',
      RH1: 'Passer (Rechts)! Blijf voor S1 op de passlijn. Pas de bal, val daarna direct aan op Rechts-voor (P2).',
      RH2: 'Passer (Links)! Gelijkmatig op de passlijn (x=180). Pas de linkernaad, loop daarna door naar P6.',
      M2: 'Passer (Midden)! Gelijkmatig in het centrum (x=300). Pas het midden, verdedig daarna op Links-achter (P5).',
      S2: 'Korte Opslag Bewaker! Sta aan de 3m-lijn (x=140) voor korte ballen. Val linksbuiten aan op Links-voor (P4).',
      M1: 'Korte Opslag Bewaker! Sta aan de 3m-lijn (x=280) voor korte ballen. Val aan op Midden-voor (P3).',
    },
  },

  // ==========================================
  // ROTATIE 2: S1 in P6 (Midden-achter)
  // ==========================================
  {
    rotationNumber: 2,
    activeSetterRole: 'S1',
    activeSetterZone: 'P6',
    title: 'Rotatie 2 (Spelverdeler 1 in P6)',
    description: 'S1 verdeelt vanuit P6. 3 Passers (RH2, M2, RH1) op één lijn. S2 & M1 aan de 3m-lijn voor korte opslag.',
    zoneOrder: {
      p1: 'RH1',
      p2: 'M1',
      p3: 'S2',
      p4: 'RH2',
      p5: 'M2',
      p6: 'S1',
    },
    passerRoles: ['RH2', 'M2', 'RH1'],
    shortServeRoles: ['S2', 'M1'],
    receivePositions: {
      S2: { x: 360, y: 160 },   // P3 aan 3m-lijn midden-rechts
      M1: { x: 460, y: 155 },   // P2 aan 3m-lijn rechts (rechts van S2)
      S1: { x: 360, y: 190 },   // P6 achter S2 (y=190 > y=160), tussen M2 & RH1
      RH2: { x: 180, y: 280 },  // P4 linker passer (voor M2 op y=295)
      M2: { x: 300, y: 295 },   // P5 midden passer (achter RH2, links van S1)
      RH1: { x: 420, y: 290 },  // P1 rechter passer (rechts van S1)
    },
    basePositions: {
      RH2: { x: 150, y: 105 }, // RH2 valt aan op Links-voor (P4)
      M1: { x: 300, y: 95 },   // M1 schuift van P2 naar P3 (Midden-voor)
      S2: { x: 450, y: 105 },  // S2 schuift van P3 naar P2 (Rechts-voor)
      M2: { x: 150, y: 290 },  // M2 blijft op Links-achter (P5)
      RH1: { x: 300, y: 325 }, // RH1 schuift naar Midden-achter (P6)
      S1: { x: 450, y: 290 },  // S1 verdeelt en verdedigt Rechts-achter (P1)
    },
    servePositions: {
      RH1: { x: 460, y: 430 }, // RH1 serveert bij P1
      RH2: { x: 150, y: 105 }, // RH2 op Links-voor (P4)
      M1: { x: 300, y: 95 },   // M1 op Midden-voor (P3)
      S2: { x: 450, y: 105 },  // S2 op Rechts-voor (P2)
      M2: { x: 150, y: 290 },  // M2 op Links-achter (P5)
      S1: { x: 450, y: 290 },  // S1 al op Rechts-achter (P1) voor verdediging
    },
    playerInstructions: {
      S1: 'Actieve Spelverdeler! Sta achter S2 aan de 3m-lijn (y=190 vs y=160). Sprint direct naar het net om te verdelen.',
      RH2: 'Passer (Links)! Zak af naar x=180 op de passlijn (blijf voor M2!). Val daarna aan op Links-voor (P4).',
      M2: 'Passer (Midden)! In het centrum (x=300) op de passlijn. Blijf daarna op Links-achter (P5) verdedigen.',
      RH1: 'Passer (Rechts)! Op x=420 op de passlijn. Verdedig daarna op Midden-achter (P6).',
      S2: 'Korte Opslag Bewaker! Dek de 3m-lijn (x=360) voor korte ballen. Schuif door naar Rechts-voor (P2).',
      M1: 'Korte Opslag Bewaker! Dek de 3m-lijn rechts (x=460). Schuif naar Midden-voor (P3) om te blokkeren/aanvallen.',
    },
  },

  // ==========================================
  // ROTATIE 3: S1 in P5 (Links-achter)
  // ==========================================
  {
    rotationNumber: 3,
    activeSetterRole: 'S1',
    activeSetterZone: 'P5',
    title: 'Rotatie 3 (Spelverdeler 1 in P5)',
    description: 'S1 verdeelt vanuit P5. 3 Passers (RH2, RH1, M1) op één lijn. M2 & S2 aan de 3m-lijn voor korte opslag.',
    zoneOrder: {
      p1: 'M1',
      p2: 'S2',
      p3: 'RH2',
      p4: 'M2',
      p5: 'S1',
      p6: 'RH1',
    },
    passerRoles: ['RH2', 'RH1', 'M1'],
    shortServeRoles: ['M2', 'S2'],
    receivePositions: {
      M2: { x: 130, y: 155 },   // P4 aan 3m-lijn links
      S2: { x: 460, y: 160 },   // P2 aan 3m-lijn rechts
      S1: { x: 130, y: 190 },   // P5 achter M2 (y=190 > y=155) en links van RH1!
      RH2: { x: 180, y: 280 },  // P3 linker passer (voor RH1 op y=290, rechts van M2)
      RH1: { x: 300, y: 290 },  // P6 midden passer
      M1: { x: 420, y: 290 },   // P1 rechter passer (achter S2 op y=160)
    },
    basePositions: {
      RH2: { x: 150, y: 105 }, // RH2 schuift naar Links-voor (P4)
      M2: { x: 300, y: 95 },   // M2 schuift naar Midden-voor (P3)
      S2: { x: 450, y: 105 },  // S2 blijft op Rechts-voor (P2)
      M1: { x: 150, y: 290 },  // M1 schuift naar Links-achter (P5)
      RH1: { x: 300, y: 325 }, // RH1 blijft op Midden-achter (P6)
      S1: { x: 450, y: 290 },  // S1 verdeelt en verdedigt op Rechts-achter (P1)
    },
    servePositions: {
      M1: { x: 460, y: 430 },  // M1 serveert bij P1
      RH2: { x: 150, y: 105 }, // RH2 op Links-voor (P4)
      M2: { x: 300, y: 95 },   // M2 op Midden-voor (P3)
      S2: { x: 450, y: 105 },  // S2 op Rechts-voor (P2)
      RH1: { x: 300, y: 325 }, // RH1 op Midden-achter (P6)
      S1: { x: 450, y: 290 },  // S1 al op Rechts-achter (P1) voor verdediging!
    },
    playerInstructions: {
      S1: 'Actieve Spelverdeler! Blijf achter M2 (y=190 vs y=155). Sprint langs de 3m-lijn naar het net.',
      RH2: 'Passer (Links)! Zak af naar x=180 op de passlijn. Val daarna aan op Links-voor (P4).',
      RH1: 'Passer (Midden)! In het centrum (x=300). Blijf daarna op Midden-achter (P6) verdedigen.',
      M1: 'Passer (Rechts)! Op x=420. Verdedig daarna op Links-achter (P5).',
      M2: 'Korte Opslag Bewaker! Dek de 3m-lijn links (x=130). Val daarna aan op Midden-voor (P3).',
      S2: 'Korte Opslag Bewaker! Dek de 3m-lijn rechts (x=460). Blijf op Rechts-voor (P2) om te blokkeren/aanvallen.',
    },
  },

  // ==========================================
  // ROTATIE 4: S2 in P1 (Rechts-achter)
  // Spiegelbeeld van Rotatie 1 met Spelverdeler 2
  // ==========================================
  {
    rotationNumber: 4,
    activeSetterRole: 'S2',
    activeSetterZone: 'P1',
    title: 'Rotatie 4 (Spelverdeler 2 in P1)',
    description: 'S2 verdeelt vanuit P1. 3 Passers (RH1, M1, RH2) op één lijn. S1 & M2 aan de 3m-lijn voor korte opslag.',
    zoneOrder: {
      p1: 'S2',
      p2: 'RH2',
      p3: 'M2',
      p4: 'S1',
      p5: 'RH1',
      p6: 'M1',
    },
    passerRoles: ['RH1', 'M1', 'RH2'],
    shortServeRoles: ['S1', 'M2'],
    receivePositions: {
      S1: { x: 140, y: 160 },   // P4 aan 3m-lijn links
      M2: { x: 280, y: 160 },   // P3 aan 3m-lijn midden
      RH1: { x: 180, y: 280 },  // P5 linker passer
      M1: { x: 300, y: 280 },   // P6 midden passer
      RH2: { x: 420, y: 270 },  // P2 rechter passer (voor S2 op y=310!)
      S2: { x: 470, y: 310 },   // P1 ACHTER RH2 (y=310 > y=270), sprint naar net!
    },
    basePositions: {
      RH2: { x: 450, y: 105 }, // RH2 valt rechts aan op Rechts-voor (P2)
      M2: { x: 300, y: 95 },   // M2 blijft Midden-voor (P3)
      S1: { x: 150, y: 105 },  // S1 valt linksbuiten aan op Links-voor (P4)
      M1: { x: 150, y: 290 },  // M1 schuift naar Links-achter (P5)
      RH1: { x: 300, y: 325 }, // RH1 schuift naar Midden-achter (P6)
      S2: { x: 450, y: 290 },  // S2 verdeelt en verdedigt op Rechts-achter (P1)
    },
    servePositions: {
      S2: { x: 460, y: 430 },  // S2 serveert bij P1
      S1: { x: 150, y: 105 },  // S1 klaar op Links-voor (P4)
      M2: { x: 300, y: 95 },   // M2 op Midden-voor (P3)
      RH2: { x: 450, y: 105 }, // RH2 klaar op Rechts-voor (P2)
      M1: { x: 150, y: 290 },  // M1 op Links-achter (P5)
      RH1: { x: 300, y: 325 }, // RH1 op Midden-achter (P6)
    },
    playerInstructions: {
      S2: 'Actieve Spelverdeler! Blijf achter RH2 (y=310 vs y=270) tot het balcontact. Sprint daarna naar het net.',
      RH2: 'Passer (Rechts)! Blijf voor S2 op de passlijn. Pas de bal, val direct aan op Rechts-voor (P2).',
      RH1: 'Passer (Links)! Gelijkmatig op x=180 op passlijn. Pas linkernaad, loop door naar P6.',
      M1: 'Passer (Midden)! In centrum op x=300. Pas midden, verdedig op Links-achter (P5).',
      S1: 'Korte Opslag Bewaker! Sta aan 3m-lijn (x=140). Val linksbuiten aan op Links-voor (P4).',
      M2: 'Korte Opslag Bewaker! Sta aan 3m-lijn (x=280). Val aan op Midden-voor (P3).',
    },
  },

  // ==========================================
  // ROTATIE 5: S2 in P6 (Midden-achter)
  // Spiegelbeeld van Rotatie 2
  // ==========================================
  {
    rotationNumber: 5,
    activeSetterRole: 'S2',
    activeSetterZone: 'P6',
    title: 'Rotatie 5 (Spelverdeler 2 in P6)',
    description: 'S2 verdeelt vanuit P6. 3 Passers (RH1, M1, RH2) op één lijn. S1 & M2 aan de 3m-lijn voor korte opslag.',
    zoneOrder: {
      p1: 'RH2',
      p2: 'M2',
      p3: 'S1',
      p4: 'RH1',
      p5: 'M1',
      p6: 'S2',
    },
    passerRoles: ['RH1', 'M1', 'RH2'],
    shortServeRoles: ['S1', 'M2'],
    receivePositions: {
      S1: { x: 360, y: 160 },   // P3 aan 3m-lijn midden-rechts
      M2: { x: 460, y: 155 },   // P2 aan 3m-lijn rechts
      S2: { x: 360, y: 190 },   // P6 achter S1 (y=190 > y=160)
      RH1: { x: 180, y: 280 },  // P4 linker passer (voor M1 op y=295)
      M1: { x: 300, y: 295 },   // P5 midden passer (achter RH1, links van S2)
      RH2: { x: 420, y: 290 },  // P1 rechter passer (rechts van S2)
    },
    basePositions: {
      RH1: { x: 150, y: 105 }, // RH1 valt aan op Links-voor (P4)
      M2: { x: 300, y: 95 },   // M2 schuift naar Midden-voor (P3)
      S1: { x: 450, y: 105 },  // S1 schuift naar Rechts-voor (P2)
      M1: { x: 150, y: 290 },  // M1 blijft op Links-achter (P5)
      RH2: { x: 300, y: 325 }, // RH2 schuift naar Midden-achter (P6)
      S2: { x: 450, y: 290 },  // S2 verdeelt en verdedigt op Rechts-achter (P1)
    },
    servePositions: {
      RH2: { x: 460, y: 430 }, // RH2 serveert bij P1
      RH1: { x: 150, y: 105 }, // RH1 op Links-voor (P4)
      M2: { x: 300, y: 95 },   // M2 op Midden-voor (P3)
      S1: { x: 450, y: 105 },  // S1 op Rechts-voor (P2)
      M1: { x: 150, y: 290 },  // M1 op Links-achter (P5)
      S2: { x: 450, y: 290 },  // S2 al op Rechts-achter (P1) voor verdediging
    },
    playerInstructions: {
      S2: 'Actieve Spelverdeler! Blijf achter S1 aan 3m-lijn (y=190 vs y=160). Sprint direct naar het net.',
      RH1: 'Passer (Links)! Zak af naar x=180 op de passlijn. Val aan op Links-voor (P4).',
      M1: 'Passer (Midden)! In centrum op x=300. Blijf daarna op Links-achter (P5).',
      RH2: 'Passer (Rechts)! Op x=420. Verdedig daarna op Midden-achter (P6).',
      S1: 'Korte Opslag Bewaker! Dek de 3m-lijn (x=360). Schuif naar Rechts-voor (P2).',
      M2: 'Korte Opslag Bewaker! Dek de 3m-lijn rechts (x=460). Schuif naar Midden-voor (P3).',
    },
  },

  // ==========================================
  // ROTATIE 6: S2 in P5 (Links-achter)
  // Spiegelbeeld van Rotatie 3
  // ==========================================
  {
    rotationNumber: 6,
    activeSetterRole: 'S2',
    activeSetterZone: 'P5',
    title: 'Rotatie 6 (Spelverdeler 2 in P5)',
    description: 'S2 verdeelt vanuit P5. 3 Passers (RH1, RH2, M2) op één lijn. M1 & S1 aan de 3m-lijn voor korte opslag.',
    zoneOrder: {
      p1: 'M2',
      p2: 'S1',
      p3: 'RH1',
      p4: 'M1',
      p5: 'S2',
      p6: 'RH2',
    },
    passerRoles: ['RH1', 'RH2', 'M2'],
    shortServeRoles: ['M1', 'S1'],
    receivePositions: {
      M1: { x: 130, y: 155 },   // P4 aan 3m-lijn links
      S1: { x: 460, y: 160 },   // P2 aan 3m-lijn rechts
      S2: { x: 130, y: 190 },   // P5 achter M1 (y=190 > y=155) en links van RH2!
      RH1: { x: 180, y: 280 },  // P3 linker passer (voor RH2 op y=290, rechts van M1)
      RH2: { x: 300, y: 290 },  // P6 midden passer
      M2: { x: 420, y: 290 },   // P1 rechter passer (achter S1 op y=160)
    },
    basePositions: {
      RH1: { x: 150, y: 105 }, // RH1 schuift naar Links-voor (P4)
      M1: { x: 300, y: 95 },   // M1 schuift naar Midden-voor (P3)
      S1: { x: 450, y: 105 },  // S1 blijft op Rechts-voor (P2)
      M2: { x: 150, y: 290 },  // M2 schuift naar Links-achter (P5)
      RH2: { x: 300, y: 325 }, // RH2 blijft op Midden-achter (P6)
      S2: { x: 450, y: 290 },  // S2 verdeelt en verdedigt op Rechts-achter (P1)
    },
    servePositions: {
      M2: { x: 460, y: 430 },  // M2 serveert bij P1
      RH1: { x: 150, y: 105 }, // RH1 op Links-voor (P4)
      M1: { x: 300, y: 95 },   // M1 op Midden-voor (P3)
      S1: { x: 450, y: 105 },  // S1 op Rechts-voor (P2)
      RH2: { x: 300, y: 325 }, // RH2 op Midden-achter (P6)
      S2: { x: 450, y: 290 },  // S2 al op Rechts-achter (P1) voor verdediging!
    },
    playerInstructions: {
      S2: 'Actieve Spelverdeler! Blijf achter M1 (y=190 vs y=155). Sprint langs de 3m-lijn naar het net.',
      RH1: 'Passer (Links)! Zak af naar x=180 op de passlijn. Val aan op Links-voor (P4).',
      RH2: 'Passer (Midden)! In centrum op x=300. Blijf daarna op Midden-achter (P6) verdedigen.',
      M2: 'Passer (Rechts)! Op x=420. Verdedig daarna op Links-achter (P5).',
      M1: 'Korte Opslag Bewaker! Dek de 3m-lijn links (x=130). Val daarna aan op Midden-voor (P3).',
      S1: 'Korte Opslag Bewaker! Dek de 3m-lijn rechts (x=460). Blijf op Rechts-voor (P2) om te blokkeren/aanvallen.',
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

  // Voor-achter controles (lagere y is dichter bij het net)
  const p2p1Ok = pos[p2].y < pos[p1].y;
  const p3p6Ok = pos[p3].y < pos[p6].y;
  const p4p5Ok = pos[p4].y < pos[p5].y;

  // Links-rechts controles (lagere x is links van hogere x)
  const frontRowLR = pos[p4].x < pos[p3].x && pos[p3].x < pos[p2].x;
  const backRowLR = pos[p5].x < pos[p6].x && pos[p6].x < pos[p1].x;

  const isAllValid = p2p1Ok && p3p6Ok && p4p5Ok && frontRowLR && backRowLR;

  const details: string[] = [];
  if (!p2p1Ok) details.push(`FOUT: ${p1} in P1 staat voor ${p2} in P2 (y: ${pos[p1].y} vs ${pos[p2].y})`);
  if (!p3p6Ok) details.push(`FOUT: ${p6} in P6 staat voor ${p3} in P3 (y: ${pos[p6].y} vs ${pos[p3].y})`);
  if (!p4p5Ok) details.push(`FOUT: ${p5} in P5 staat voor ${p4} in P4 (y: ${pos[p5].y} vs ${pos[p4].y})`);
  if (!frontRowLR) details.push(`FOUT: Voorste rij staat niet in juiste links-naar-rechts volgorde`);
  if (!backRowLR) details.push(`FOUT: Achterste rij staat niet in juiste links-naar-rechts volgorde`);

  if (isAllValid) {
    details.push('Alle voor-achter en links-rechts opstellingsregels 100% in orde.');
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
