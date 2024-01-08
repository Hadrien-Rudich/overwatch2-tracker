import { useState } from 'react';
import { FaRegSquare, FaCheck } from 'react-icons/fa';

interface TickableBoxProps {
  // filterIsActive: boolean;
  filteredArray: string[];
}
const TickableBox = ({
  // filterIsActive,
  filteredArray,
}: TickableBoxProps) => {
  const [filterBoxIsTicked, tickFilterBox] = useState(false);

  const handleFilterClick = () => {
    tickFilterBox(!filterBoxIsTicked);
  };

  return (
    <>
      {filteredArray.length > 0 && (
        <div className="flexdiv relative ">
          <button
            type="button"
            className="w-5 h-5 hover:scale-110"
            onClick={handleFilterClick}
          >
            <FaRegSquare className="z-10 w-5 h-5 relative " />
            {filteredArray.length > 0 && (
              <div className="absolute top-[0.15rem] right-[0.125rem] bg-ringColor w-4 h-4 rounded-sm">
                <FaCheck className="z-0 absolute top-0.5 right-0.5 w-3 h-3" />
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default TickableBox;
