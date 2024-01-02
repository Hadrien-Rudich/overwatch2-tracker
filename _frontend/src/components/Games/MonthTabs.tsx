import { MouseEvent } from 'react';
import { gameStore } from '../../store/gameStore';
import { months } from '../../utils/utils';

function MonthTabs() {
  const { currentMonth, setCurrentMonth } = gameStore();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setCurrentMonth(Number(event.currentTarget.value));
  };

  return (
    <div className="monthTab_container">
      <div className="rounded-sm shadow-md  flex divide-x bg-secondaryColor divide-activeColor">
        {months.map((month, index) => (
          <button
            key={month.index}
            value={month.index}
            onClick={handleClick}
            type="button"
            className={`${
              Number(currentMonth) === Number(month.index)
                ? `bg-thirdColor text-secondaryText rounded-sm shadow-md`
                : ` hover:bg-activeColor hover:shadow-md `
            } w-1/12 h-8 tracking-widest flex justify-center items-center 
            ${index === 0 ? 'rounded-sm rounded-r-none' : ''} ${
              index === months.length - 1 ? 'rounded-sm rounded-l-none' : ''
            }`}
          >
            {month.label.substring(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MonthTabs;
