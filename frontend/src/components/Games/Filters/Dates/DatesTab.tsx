import SubTab from '../SubTab.tsx';
import filterStore from '../../../../store/filterStore.ts';
function DatesTab() {
  const { filteredDates } = filterStore();
  return (
    <SubTab
      activeFilterProp="dates"
      tabName="Dates"
      filteredArray={filteredDates}
    />
  );
}

export default DatesTab;
