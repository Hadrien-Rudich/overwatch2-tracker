/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { GameData } from '../types/store/gameTypes';
import { getHeroesByWinRatio, getColorForWinPercentage } from './chartsUtils';

function processHorizontalBarChartData(gamesData: GameData[]) {
  const topHeroes = getHeroesByWinRatio(gamesData, 5); // Request the top 5 heroes
  const labels = topHeroes.map((hero) => hero.hero);

  // Calculate the data as fractions
  const data = topHeroes.map((hero) => {
    const { wins, losses, draws, gamesPlayed } = hero;

    // Calculate the fraction of wins/draws/losses
    const winFraction = gamesPlayed > 0 ? wins / gamesPlayed : 0;
    const lossFraction = gamesPlayed > 0 ? losses / gamesPlayed : 0;
    const drawFraction = gamesPlayed > 0 ? draws / gamesPlayed : 0;
    // change value (1) to cause error
    const gamesFraction = 1 - winFraction;

    return [winFraction, gamesFraction, lossFraction, drawFraction];
  });

  const datasets = [
    {
      label: 'Wins',
      data: data.map((fractions) => fractions[0]), // Win fractions
      backgroundColor: topHeroes.map((hero) =>
        getColorForWinPercentage(hero.winRatio)
      ),
      hoverBorderColor: 'none',
      hoverBorderWidth: 0,
      hoverOffset: 5,
      borderWidth: 1,
      barThickness: 30, // Set the bar width
      image: topHeroes.map((hero) => `/images/heroes/${hero.hero}.png`),
      // Configure data labels for this dataset
      datalabels: {
        display: true,
        color: '#000080',
        font: {
          size: 20,
          family: 'Big Noodle Titling',
        },
        anchor: 'center',
        align: 'center',
        formatter: (value: number) => `${(value * 100).toFixed(0)}%`,
      },
    },
    {
      label: 'Total Games',
      data: data.map((fractions) => fractions[1]), // Game fractions
      backgroundColor: 'light gray',
      hoverBorderColor: 'none',
      hoverBackgroundColor: 'white',
      hoverBorderWidth: 0,
      hoverOffset: 5,
      borderWidth: 1,
      barThickness: 30, // Set the bar width
      rightText: topHeroes.map((hero) => hero.gamesPlayed),
      datalabels: {
        display: false, // Hide data labels for this dataset
      },
    },
    {
      label: 'Losses',
      data: data.map((fractions) => fractions[2]), // Games fractions
      backgroundColor: 'light gray',
      hoverBorderColor: 'none',
      hoverBackgroundColor: 'white',
      hoverBorderWidth: 0,
      hoverOffset: 5,
      borderWidth: 1,
      hidden: true,
      datalabels: {
        display: false, // Hide data labels for this dataset
      },
    },
    {
      label: 'Draws',
      data: data.map((fractions) => fractions[3]), // Games fractions
      backgroundColor: 'light gray',
      hoverBorderColor: 'none',
      hoverBackgroundColor: 'white',
      hoverBorderWidth: 0,
      hoverOffset: 5,
      borderWidth: 1,
      hidden: true,
      datalabels: {
        display: false, // Hide data labels for this dataset
      },
    },
  ];

  return {
    labels,
    datasets,
  };
}

function generateToolTipLabel(context: {
  chart: { data: { datasets: any[] } };
  dataIndex: string | number;
}) {
  const { chart } = context;
  const { dataIndex } = context;
  const { datasets } = chart.data;
  const wins = datasets[0].data[dataIndex];
  const totalGames = datasets[1].rightText[dataIndex];
  const losses = datasets[2].data[dataIndex];
  const draws = datasets[3].data[dataIndex];

  const formatLabel = (value: number, singular: string, plural: string) => {
    return `${value} ${value <= 1 ? singular : plural}`;
  };

  const totalWinsLabel = formatLabel(totalGames * wins, 'win', 'wins');
  const totalLossesLabel = formatLabel(totalGames * losses, 'loss', 'losses');
  const totalDrawsLabel = formatLabel(totalGames * draws, 'draw', 'draws');

  return `${totalWinsLabel} - ${totalLossesLabel} - ${totalDrawsLabel}`;
}

function generateLeftHandSideHeroImg(chart: {
  ctx: any;
  data: any;
  options: any;
  scales: { x: any; y: any };
}) {
  const {
    ctx,
    data,
    options,
    scales: { y },
  } = chart;

  const imageSize = options.layout.padding.left;
  ctx.save();

  data.datasets[0].image.forEach((imageLink: string, index: any) => {
    const logo = new Image();
    logo.src = imageLink;
    ctx.drawImage(
      logo,
      0,
      y.getPixelForValue(index) - imageSize / 2,
      imageSize,
      imageSize
    );
  });
}

function generateRightHandSideTotalGamesText(chart: {
  ctx: any;
  data: any;
  options: any;
  scales: { x: any; y: any };
}) {
  const {
    ctx,
    data,
    options,
    scales: { x, y },
  } = chart;
  const rightPadding = 175;
  const textSize = options.layout.padding.right;
  ctx.save();

  data.datasets[1].rightText.forEach((numberOfGames: number, index: any) => {
    // Determine the position for the text
    const xPosition = x.getPixelForValue(0) + textSize + rightPadding;
    const yPosition = y.getPixelForValue(index);

    // Set the font properties
    ctx.font = '15px Big Noodle Titling';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000080';

    // Display the number of games
    ctx.fillText(`${numberOfGames} games`, xPosition, yPosition);
  });
}

export {
  processHorizontalBarChartData,
  generateLeftHandSideHeroImg,
  generateRightHandSideTotalGamesText,
  generateToolTipLabel,
};
