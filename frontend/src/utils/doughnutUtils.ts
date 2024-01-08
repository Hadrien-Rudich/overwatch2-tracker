/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Chart as ChartJS } from 'chart.js';

function processDoughnutChartData(results: number[]) {
  const data = {
    labels: ['Win', 'Loss', 'Draw'],
    datasets: [
      {
        data: results,
        backgroundColor: [
          'rgba(75, 192, 128, 0.8)',
          'rgba(255, 99, 132,0.8)',
          'rgba(255, 206, 86,0.8)',
        ],
        hoverBackgroundColor: [
          'rgba(75, 192, 128, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        hoverBorderColor: ['none'],
        hoverBorderWidth: 0,
        hoverOffset: 5,
        borderWidth: 0,
      },
    ],
  };

  // Check if the "Draw" segment is present in the data
  const isDrawPresent = results[2] > 0;
  // Ensure that the "Draw" segment is zero if it's not present
  if (!isDrawPresent) {
    // eslint-disable-next-line no-param-reassign
    results[2] = 0;
  }
  // If the "Draw" segment is not present (0%), remove it from the labels and dataset
  if (!isDrawPresent) {
    data.labels = ['Win', 'Loss'];
    data.datasets[0].data = results.slice(0, 2); // Remove the "Draw" segment data
    data.datasets[0].backgroundColor = data.datasets[0].backgroundColor.slice(
      0,
      2
    ); // Remove the "Draw" segment background colors
    data.datasets[0].hoverBackgroundColor =
      data.datasets[0].hoverBackgroundColor.slice(0, 2); // Remove the "Draw" segment hover background colors
  }

  return data;
}

function generateToolTipLabel(context: {
  chart: { data: { datasets: any[] } };
  dataIndex: string | number;
}) {
  const totalWins = context.chart.data.datasets[0].data[0];
  const totalLosses = context.chart.data.datasets[0].data[1];
  const totalDraws = context.chart.data.datasets[0].data[2];

  // Check the index to determine which segment is being hovered
  const index = context.dataIndex;

  const formatTooltip = (value: number, singular: string, plural: string) => {
    return `${value} ${value <= 1 ? singular : plural}`;
  };

  switch (index) {
    case 0:
      return formatTooltip(totalWins, 'win', 'wins');
    case 1:
      return formatTooltip(totalLosses, 'loss', 'losses');
    case 2:
      return formatTooltip(totalDraws, 'draw', 'draws');
    default:
      return '';
  }
}

function generateTextInsideDouhgnutHole(chart: ChartJS<'doughnut'>) {
  const { ctx, data } = chart;
  ctx.save();
  ctx.font = '20px Big Noodle Titling';
  ctx.fillStyle = '#000080'; // Navy Blue
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Calculate the total based on the available segments
  const totalGames = data.datasets[0].data.reduce(
    (acc, value) => acc + (Number.isNaN(value) ? 0 : value),
    0
  );
  ctx.fillText(
    `${totalGames} Games`,
    chart.getDatasetMeta(0).data[0].x,
    chart.getDatasetMeta(0).data[0].y
  );
}

function generateTextInsideDoughnutSegments(chart: ChartJS<'doughnut'>) {
  const { ctx } = chart;
  const { data } = chart.data.datasets[0];
  const segments = chart.getDatasetMeta(0).data;
  const total = data.reduce((acc: number, value: number) => acc + value, 0);

  ctx.font = '20px Big Noodle Titling';
  ctx.fillStyle = '#000080'; // Navy Blue
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // @ts-ignore
  segments.forEach((segment: Chart.ArcElement, index: number) => {
    const model = segment.getCenterPoint();
    const segmentValue = data[index];
    const percentage = ((segmentValue / total) * 100).toFixed(0);
    ctx.fillText(`${percentage}%`, model.x, model.y); // Display the percentage
  });
}

export {
  generateTextInsideDouhgnutHole,
  generateTextInsideDoughnutSegments,
  generateToolTipLabel,
  processDoughnutChartData,
};
