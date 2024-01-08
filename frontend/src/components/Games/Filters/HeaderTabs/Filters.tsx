import FilterTab from './FilterTab';
import ClearAllTab from './ClearAllTab';
import { filterStore } from '../../../../store/filterStore';

function Filters() {
  const { displayedFilter: activeFilter } = filterStore();
  return (
    <div className="filters_container w-full ">
      <div className="bg-fifthColor shadow-md rounded-sm flex ring-1 divide-x-[0.063rem] divide-ringColor absolute top-[-2.15rem] left-[0rem] w-[12rem]">
        <div className={`${activeFilter !== '' ? 'w-1/2' : 'w-full '}`}>
          <FilterTab />
        </div>
        {activeFilter !== '' && (
          <div className="w-1/2">
            <ClearAllTab />
          </div>
        )}
      </div>
    </div>
  );
}

export default Filters;
