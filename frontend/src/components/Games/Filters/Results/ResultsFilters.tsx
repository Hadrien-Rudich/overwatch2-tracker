// import { useState } from 'react';
import { filterStore } from '../../../../store/filterStore';
import ClearFilters from '../ClearFilters';

function ResultsFilters() {
  const {
    displayedFilter: activeFilter,
    filterResult,
    unfilterResult,
    filteredResults,
    clearFilteredResults,
  } = filterStore();

  const handleResultClick = (result: string) => {
    if (filteredResults.includes(result)) {
      unfilterResult(result);
    } else {
      filterResult(result);
    }
  };

  return (
    <div className="ResultsFilters_container w-[12rem] flexdiv h-full  bg-mainColor border-l-[0.125rem] border-ringColor">
      <div className="options_container flexdiv col w-1/2 gap-3">
        <button
          type="button"
          onClick={() => handleResultClick('win')}
          className={`${
            filteredResults.includes('win')
              ? 'active bg-activeWin '
              : 'inactive bg-disabled hover:bg-activeWin '
          }              
      filter shadow-md `}
        >
          <p className="xl:tracking-widest">win</p>
        </button>
        <button
          type="button"
          onClick={() => handleResultClick('loss')}
          className={`${
            filteredResults.includes('loss')
              ? 'active bg-activeLoss '
              : 'inactive bg-disabled hover:bg-activeLoss'
          }              
      filter shadow-md`}
        >
          <p className="xl:tracking-widest">loss</p>
        </button>
        <button
          type="button"
          onClick={() => handleResultClick('draw')}
          className={`${
            filteredResults.includes('draw')
              ? 'active bg-activeDraw '
              : 'inactive bg-disabled hover:bg-activeDraw'
          }              
      filter shadow-md`}
        >
          <p className="xl:tracking-widest">draw</p>
        </button>
      </div>
      {activeFilter === 'results' && filteredResults.length > 0 && (
        <ClearFilters clearFilteredArray={clearFilteredResults} />
      )}
    </div>
  );
}

export default ResultsFilters;
