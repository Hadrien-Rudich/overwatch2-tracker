import SubTab from '../SubTab.tsx';
import filterStore from '../../../../store/filterStore.ts';
function ResultsTab() {
  const { filteredResults } = filterStore();
  return (
    <SubTab
      activeFilterProp="results"
      tabName="Results"
      filteredArray={filteredResults}
    />
  );
}

export default ResultsTab;
