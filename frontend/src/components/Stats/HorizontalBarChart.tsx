/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartjsPluginStacked100 from 'chartjs-plugin-stacked100';
import { Bar } from 'react-chartjs-2';
import { gameStore } from '../../store/gameStore';
import { chartStyles } from '../../utils/chartsUtils';
import {
  generateLeftHandSideHeroImg,
  generateRightHandSideTotalGamesText,
  generateToolTipLabel,
  processHorizontalBarChartData,
} from '../../utils/horizontalBarUtils';

ChartJS.register(
  ChartjsPluginStacked100,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const leftHandSideHeroImg = {
  id: 'leftHandSideHeroImg',
  beforeDatasetsDraw(chart: {
    ctx: any;
    data: any;
    options: any;
    scales: { x: any; y: any };
  }) {
    generateLeftHandSideHeroImg(chart);
  },
};

const rightHandSideTotalGamesText = {
  id: 'rightHandSideTotalGamesText',
  beforeDatasetsDraw(chart: {
    ctx: any;
    data: any;
    options: any;
    scales: { x: any; y: any };
  }) {
    generateRightHandSideTotalGamesText(chart);
  },
};

const options = {
  // maintainAspectRatio: true,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  layout: {
    padding: {
      left: 35,
      right: 30,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Top 5 Heroes',
      font: {
        size: 20,
        family: 'Big Noodle Titling',
      },
      color: '#000080',
    },
    stacked100: {
      enable: true,
      replaceTooltipLabel: false,
    },
    tooltip: {
      position: 'average',
      yAlign: 'bottom',
      xAlign: 'left',
      caretSize: 0,
      callbacks: {
        title() {
          return null;
        },
        afterTitle() {
          return null;
        },
        label: generateToolTipLabel,
      },
    },
  },

  scales: {
    x: {
      display: false,
      min: 0,
      max: 100,
      grace: 5,
    },
    y: {
      display: false,
      min: 0,
      max: 100,
      grace: 5,
    },
  },
};

function HorizontalBarChart() {
  const { gamesData } = gameStore();
  const chartData = processHorizontalBarChartData(gamesData);

  return (
    <div style={chartStyles}>
      <Bar
        // @ts-ignore
        options={options}
        plugins={[
          ChartDataLabels,
          // @ts-ignore
          leftHandSideHeroImg,
          // @ts-ignore
          rightHandSideTotalGamesText,
        ]}
        height={250}
        // @ts-ignore
        data={chartData}
      />
    </div>
  );
}

export default HorizontalBarChart;
