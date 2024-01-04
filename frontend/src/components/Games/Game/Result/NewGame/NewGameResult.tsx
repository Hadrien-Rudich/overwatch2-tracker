import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import { getResultClassNameFromResult } from '../../../../../utils/classNameUtils';
import ResultsDropDown from './ResultsDropDown';
import ErrorToast from '../../../../ErrorToast';

function NewGameResult() {
  const {
    selectedGameResult,
    resultErrorToast,
    resultErrorToastMessage,
    setResultErrorToast,
  } = gameStore();

  const [isDropDownActive, setIsDropDownActive] = useState(false);
  const isLargeScreen = window.innerWidth > 768;

  const toggleDropDown = () => {
    setResultErrorToast(false);
    setIsDropDownActive(!isDropDownActive);
  };
  return (
    <div className="NewGameResult_container w-full relative">
      {resultErrorToast && (
        <ErrorToast
          toastText={resultErrorToastMessage}
          booleanProp={resultErrorToast}
          widthProp="sm:w-[125%] w-[200%]"
          topProp="sm:top-[-2.1rem] top-[-1.55rem] "
          centeringProp="sm:left-[-12.5%] sm:right-[-12.5%]"
        />
      )}
      <div className="results_container relative flexdiv w-full  ">
        {/* <div className="absolute w-full top-[-0.75rem] right-0  bg-activeColor"> */}
        {isDropDownActive ? (
          <ResultsDropDown toggleDropDown={toggleDropDown} />
        ) : (
          <div className=" relative w-[75%] bg-activeColor">
            {selectedGameResult !== '' ? (
              <button
                className={`${getResultClassNameFromResult(
                  selectedGameResult
                )} w-full ring-2 h-8 shadow-md`}
                type="button"
                onClick={toggleDropDown}
              >
                {isLargeScreen
                  ? selectedGameResult
                  : selectedGameResult.slice(0, 1)}
              </button>
            ) : (
              <button
                className={`${getResultClassNameFromResult(
                  selectedGameResult
                )} w-full relative ring-2 h-8 shadow-md`}
                type="button"
                onClick={toggleDropDown}
              >
                <div className="result_container flexdiv ">
                  <div className="flexdiv">
                    <p className="xl:tracking-widest">
                      {isLargeScreen ? 'RESULT' : 'R'}
                    </p>
                  </div>
                </div>
              </button>
            )}
            <MdOutlineKeyboardArrowDown className="absolute h-4 w-4 top-[0.5rem] right-[-0.1rem] pointer-events-none lg:block hidden" />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewGameResult;
