export const LEVEL_THRESHOLDS = [
  { level: 1, name: 'Cyber Recruit', minXP: 0, maxXP: 199 },
  { level: 2, name: 'Script Specialist', minXP: 200, maxXP: 499 },
  { level: 3, name: 'Network Defender', minXP: 500, maxXP: 999 },
  { level: 4, name: 'Security Analyst', minXP: 1000, maxXP: 1999 },
  { level: 5, name: 'Ethical Hacker', minXP: 2000, maxXP: 3999 },
  { level: 6, name: 'Cyber Mastermind', minXP: 4000, maxXP: Infinity },
];

export const calculateLevel = (totalXP = 0) => {
  let currentLevel = LEVEL_THRESHOLDS[0];

  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i].minXP) {
      currentLevel = LEVEL_THRESHOLDS[i];
      break;
    }
  }

  const nextLevelIndex = LEVEL_THRESHOLDS.findIndex((l) => l.level === currentLevel.level) + 1;
  const nextLevel = LEVEL_THRESHOLDS[nextLevelIndex] || null;

  let progressPercentage = 100;
  let xpToNextLevel = 0;

  if (nextLevel) {
    const xpInCurrentLevel = totalXP - currentLevel.minXP;
    const levelXPSpan = nextLevel.minXP - currentLevel.minXP;
    progressPercentage = Math.min(100, Math.round((xpInCurrentLevel / levelXPSpan) * 100));
    xpToNextLevel = nextLevel.minXP - totalXP;
  }

  return {
    level: currentLevel.level,
    title: currentLevel.name,
    minXP: currentLevel.minXP,
    nextLevelMinXP: nextLevel ? nextLevel.minXP : currentLevel.minXP,
    progressPercentage,
    xpToNextLevel,
  };
};
