/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { GameData } from '../types/store/gameTypes';

const filterGamesByMonth = (
  month: number,
  gameData: GameData[]
): GameData[] => {
  if (Number(month) === 0) {
    return gameData;
  }
  return gameData.filter(
    (game) => Number(game.date.slice(3, 5)) === Number(month)
  );
};

const backgroundColors: (string | CanvasGradient)[] = [
  'rgba(75, 192, 128, 0.8)',
  'rgba(255, 99, 132,0.8)',
  'rgba(255, 206, 86,0.8)',
];

const chartStyles: React.CSSProperties = {
  letterSpacing: '1px',
  font: 'Big Noodle Titling',
  fontSize: '10px',
  fontWeight: 'bold',
  color: '#000080',
  textAlign: 'center',
};

function getBackgroundColor(index: number): string | CanvasGradient {
  const backgroundColor = backgroundColors[index];
  if (backgroundColor !== undefined) {
    return backgroundColor;
  }
  return 'gray'; // Return a default value if the index is out of bounds
}

const filterGamesByResult = (gameData: GameData[]): number[] => {
  const wins = gameData.filter((game) => game.result === 'win');
  const losses = gameData.filter((game) => game.result === 'loss');
  const draws = gameData.filter((game) => game.result === 'draw');

  const results = [wins.length, losses.length, draws.length];

  return results;
};

// Define a custom color scale function based on win percentage
function getColorForWinPercentage(winPercentage: number) {
  let color;
  if (winPercentage >= 0 && winPercentage <= 0.39) {
    // Red for values from 0% to 39%
    color = 'rgba(255, 99, 132,0.8)';
  } else if (winPercentage >= 0.4 && winPercentage <= 0.5) {
    // Yellow for values from 40% to 50%
    color = 'rgba(255, 206, 86,0.8)';
  } else {
    // Green for values from 50% to 100%
    color = 'rgba(75, 192, 128, 0.8)';
  }

  return color;
}

function getHeroesByWinRatio(gamesData: GameData[], topCount = 5) {
  const heroStatsMap = new Map();

  // Calculate hero stats
  gamesData.forEach((game) => {
    const { result, heroes } = game;
    heroes.forEach((hero) => {
      const heroStats = heroStatsMap.get(hero) || {
        wins: 0,
        draws: 0,
        losses: 0,
        games: 0,
      };
      heroStats.games += 1;
      if (result === 'win') {
        heroStats.wins += 1;
      }
      if (result === 'draw') {
        heroStats.draws += 1;
      }
      if (result === 'loss') {
        heroStats.losses += 1;
      }
      heroStatsMap.set(hero, heroStats);
    });
  });

  // Calculate win ratios and store them in an array of objects
  const heroStatsArray = Array.from(
    heroStatsMap,
    ([hero, { wins, draws, losses, games }]) => ({
      hero,
      gamesPlayed: games, // Add games played
      wins, // Add number of wins
      losses, // Add number of losses
      draws, // Add number of draws
      winRatio: games > 0 ? wins / games : 0, // Calculate win ratio
    })
  );
  // Sort heroes by win ratio in descending order
  heroStatsArray.sort((a, b) => b.winRatio - a.winRatio);

  // Determine the number of heroes to show, ensuring it's at least 1
  const numberOfHeroesToShow = Math.max(
    Math.min(topCount, heroStatsArray.length),
    1
  );

  // Take the top N heroes
  const topHeroes = heroStatsArray.slice(0, numberOfHeroesToShow);

  return topHeroes;
}

export {
  filterGamesByMonth,
  filterGamesByResult,
  getHeroesByWinRatio,
  getColorForWinPercentage,
  getBackgroundColor,
  chartStyles,
};
