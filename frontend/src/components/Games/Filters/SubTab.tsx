import { filterStore } from '../../../store/filterStore';
import TickableBox from './TickableBox';

interface SubTabProps {
  activeFilterProp: string;
  tabName: string;
  filteredArray: string[];
}

function SubTab({ activeFilterProp, tabName, filteredArray }: SubTabProps) {
  const {
    displayedFilter: activeFilter,
    setDisplayedFilter: setActiveFilter,
    clearDisplayedFilter: clearActiveFilter,
  } = filterStore();

  const handleTabClick = () => {
    if (activeFilter === activeFilterProp) {
      clearActiveFilter();
    } else {
      setActiveFilter(activeFilterProp);
    }
  };

  return (
    <div className="SubTab_container flex w-full">
      <button type="button" className=" w-full" onClick={handleTabClick}>
        <div className="option_container h-10 flex w-full">
          <div className=" flex justify-start items-center w-16 pl-3">
            <p className="sm:text-base text-sm tracking-widest">{tabName}</p>
          </div>
          <div className=" flex justify-start items-center">
            <TickableBox filteredArray={filteredArray} />
          </div>
        </div>
      </button>
    </div>
  );
}

export default SubTab;
