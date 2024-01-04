import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useState, useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import type { GameData } from '../../../../../types/store/gameTypes';
import {
  formatDateForGameEdit,
  convertDateToDatePickerFormat,
} from '../../../../../utils/utils';

function DateWidget({
  setIsDropDownActive,
  gameObj,
}: {
  setIsDropDownActive: (value: boolean) => void;
  gameObj: GameData;
}) {
  const { selectedGameDate, selectGameDate, selectGameDateInFormat } =
    gameStore();

  const uneditedDate = convertDateToDatePickerFormat(gameObj.date);

  const [gameObjectDate, setGameObjectDate] = useState(
    convertDateToDatePickerFormat(gameObj.date)
  );

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const datePickerRef = useRef(null);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="flexdiv relative ">
      <DatePicker
        locale="en"
        dateFormat="dd/MM"
        selected={
          selectedGameDate === gameObjectDate ? selectedGameDate : uneditedDate
        }
        onClickOutside={() => {
          setIsDropDownActive(false);
          setIsCalendarOpen(false);
        }}
        onChange={(date) => date && selectGameDate(date)}
        onSelect={(date) => {
          selectGameDate(date);
          setGameObjectDate(date);
          selectGameDateInFormat(formatDateForGameEdit(date));
        }}
        className="h-8 ring-2 w-full z-50 text-center hover:cursor-pointer focus:ring-thirdColor focus:outline-none tracking-widest shadow-md"
        wrapperClassName="w-full"
        onCalendarOpen={() => setIsCalendarOpen(true)}
        onCalendarClose={() => setIsCalendarOpen(false)}
        ref={datePickerRef}
      />
      {isCalendarOpen ? null : (
        <MdOutlineKeyboardArrowDown
          onClick={handleCalendarToggle}
          className="absolute w-4 h-4 top-1/2 right-[-0.15rem] pointer-events-none lg:block hidden"
        />
      )}
    </div>
  );
}

export default DateWidget;
