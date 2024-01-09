import { useGamesQuery } from '../../hooks/games/useGamesQuery';
import { gameStore } from '../../store/gameStore';

import LoadingSpinner from '../LoadingSpinner';
// import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
import HorizontalBarChart from './HorizontalBarChart';
import NotFound from '../NotFound';

function Stats() {
  const { gamesData } = gameStore();

  const { isLoading, isFetching, isError, isSuccess } = useGamesQuery();

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="Stats_container flexdiv w-full h-full lg:my-[8.5rem] my-[4.5rem] container mx-auto rounded-sm relative">
      {isError && gamesData.length === 0 && (
        <NotFound
          propText="NO STATS FOUND"
          topPosition="lg:top-[-5.5rem] top-[-3.4rem]"
        />
      )}
      {isSuccess && gamesData.length > 0 && (
        <div className="flexdiv w-full">
          <div className="my-6 bg-mainColor w-full flexdiv">
            {/* <div className="bg-mainColor mt-24 container mx-auto flexdiv gap-24">
              <LineChart />
            </div> */}
            <div className="bg-mainColor container mx-auto flexdiv my-12">
              <DoughnutChart />
            </div>
            <div className="bg-mainColor container mx-auto flexdiv my-12">
              <HorizontalBarChart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stats;
