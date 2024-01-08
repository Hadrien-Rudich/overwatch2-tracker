import FilterTab from './HeaderTabs/FilterTab';
import ClearAllTab from './HeaderTabs/ClearAllTab';
import { filterStore } from '../../../store/filterStore';

interface FiltersProps {
  filteredGamesNumber: number;
}

function Filters({ filteredGamesNumber }: FiltersProps) {
  const { displayedFilter } = filterStore();
  return (
    <div className="filters_container w-full ">
      <div className="bg-fifthColor shadow-md rounded-sm flex ring-1 divide-x-[0.063rem] divide-ringColor absolute top-[-2.15rem] left-[0rem] w-[12rem]">
        <div className={`${displayedFilter !== '' ? 'w-1/2' : 'w-full '}`}>
          <FilterTab filteredGamesNumber={filteredGamesNumber} />
        </div>
        {displayedFilter !== '' && (
          <div className="w-1/2">
            <ClearAllTab />
          </div>
        )}
      </div>
    </div>
  );
}

export default Filters;
