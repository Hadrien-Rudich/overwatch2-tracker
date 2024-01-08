import SubTab from '../SubTab';
import { filterStore } from '../../../../store/filterStore';

function MapsTab() {
  const { filteredMaps } = filterStore();
  return (
    <SubTab
      activeFilterProp="maps"
      tabName="Maps"
      filteredArray={filteredMaps}
    />
  );
}

export default MapsTab;
