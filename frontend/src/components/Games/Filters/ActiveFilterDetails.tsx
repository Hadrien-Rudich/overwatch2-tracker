import { filterStore } from '../../../store/filterStore';
import ResultsFilters from './Results/ResultsFilters';
import HeroesFilters from './Heroes/HeroesFilters';
import MapsFilters from './Maps/MapsFilters';
import DatesFilters from './Dates/DatesFilters';

function ActiveFilterDetails() {
  const { displayedFilter: activeFilter } = filterStore();

  const activeTabComponent = () => {
    switch (activeFilter) {
      case 'results':
        return <ResultsFilters />;
      case 'heroes':
        return <HeroesFilters />;
      case 'maps':
        return <MapsFilters />;
      case 'dates':
        return <DatesFilters />;
      default:
        return null;
    }
  };
  return activeTabComponent();
}

export default ActiveFilterDetails;
