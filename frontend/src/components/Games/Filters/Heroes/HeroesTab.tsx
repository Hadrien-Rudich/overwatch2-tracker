import SubTab from '../SubTab';
import { filterStore } from '../../../../store/filterStore';

function HeroesTab() {
  const { filteredHeroes } = filterStore();
  return (
    <SubTab
      activeFilterProp="heroes"
      tabName="Heroes"
      filteredArray={filteredHeroes}
    />
  );
}

export default HeroesTab;
