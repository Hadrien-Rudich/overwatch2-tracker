/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Chart as ChartJS } from 'chart.js';
import { Point } from 'chart.js/auto';

function generateTopLabelInVerticalLineChart(chart: ChartJS<'line'>) {
  const {
    ctx,
    scales: { x },
  } = chart;

  chart.data.datasets[0].data.forEach((_datapoint, index) => {
    const datasetArray: number[] = [];

    chart.data.datasets.forEach((dataset) => {
      datasetArray.push(dataset.data[index] as number);
    });

    const totalSum = (total: number, values: number) => {
      return total + values;
    };
    const sum = datasetArray.reduce(totalSum, 0);

    ctx.font = '20px Big Noodle Titling';
    ctx.fillStyle = '#000080';
    ctx.textAlign = 'center';
    ctx.fillText(
      sum.toString(),
      x.getPixelForValue(index),
      (chart.getDatasetMeta(1).data[index] as Point).y - 10
    );
  });
}

// eslint-disable-next-line import/prefer-default-export
export { generateTopLabelInVerticalLineChart };
