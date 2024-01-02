import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useState, useEffect, useRef } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { gameStore } from '../../../../../store/gameStore';
import { formatDateForGameEdit } from '../../../../../utils/utils';

function DateWidget({
  setIsDropDownActive,
}: {
  setIsDropDownActive: (value: boolean) => void;
}) {
  const {
    selectGameDate,
    selectGameDateInFormat,
    selectedGameDateInFormat,
    selectedGameDate,
  } = gameStore();

  const [startDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarToggle = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const datePickerRef = useRef(null);

  useEffect(() => {
    if (selectedGameDateInFormat === '') {
      selectGameDateInFormat(formatDateForGameEdit(startDate));
    }
  }, [selectGameDateInFormat, selectedGameDateInFormat, startDate]);

  return (
    <div className="flexdiv relative">
      <DatePicker
        locale="en"
        dateFormat="dd/MM"
        selected={startDate === selectedGameDate ? startDate : selectedGameDate}
        onClickOutside={() => {
          setIsDropDownActive(false);
          setIsCalendarOpen(false);
        }}
        onChange={(date) => date && selectGameDate(date)}
        onSelect={(date) => {
          selectGameDate(date);
          selectGameDateInFormat(formatDateForGameEdit(date));
        }}
        className="ring-2 w-full h-8 z-50 text-center hover:cursor-pointer focus:ring-fourthColor focus:outline-none tracking-widest shadow-md"
        wrapperClassName="w-full"
        onCalendarOpen={() => setIsCalendarOpen(true)}
        onCalendarClose={() => setIsCalendarOpen(false)}
        ref={datePickerRef}
      />
      {isCalendarOpen ? null : (
        <MdOutlineKeyboardArrowDown
          onClick={handleCalendarToggle}
          className="absolute w-4 h-4 top-[0.5rem] right-[-0.15rem] pointer-events-none lg:block hidden "
        />
      )}
    </div>
  );
}

export default DateWidget;
