import { useState } from 'react';

// import Date from '../Date';
// import type { GameData } from '../../../../../types/store/gameTypes';
import DateWidget from './DateWidget';

function NewGameDate() {
  const [, setIsDropDownActive] = useState(false);

  return (
    <div className="NewGameDate_container flexdiv relative">
      <div className=" w-[75%] bg-activeColor">
        <DateWidget setIsDropDownActive={setIsDropDownActive} />
      </div>
    </div>
  );
}

export default NewGameDate;
