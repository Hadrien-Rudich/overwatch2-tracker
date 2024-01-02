import { IoIosInformationCircleOutline } from 'react-icons/io';

interface PwdFormatProps {
  oneLowerCase: boolean;
  oneUpperCase: boolean;
  oneDigit: boolean;
  oneSpecialChar: boolean;
  eightToTwentyChars: boolean;
}

function PwdFormat({
  oneLowerCase,
  oneUpperCase,
  oneDigit,
  oneSpecialChar,
  eightToTwentyChars,
}: PwdFormatProps) {
  return (
    <>
      <button
        type="button"
        className=" absolute top-[2.35rem] right-[-1.5rem] text-xl text-inactiveText group-hover:block"
      >
        <IoIosInformationCircleOutline />
      </button>
      <div className="passwordFormatBox px-2 py-2  text-activeColor">
        <div className="leading-tight">
          <p
            className={`${oneLowerCase ? 'text-validate' : 'text-warning '}  
      `}
          >
            1 lowercase
          </p>
          <p
            className={`${oneUpperCase ? 'text-validate' : 'text-warning '}  
      `}
          >
            1 uppercase
          </p>
          <p
            className={`${oneDigit ? 'text-validate' : 'text-warning '}  
      `}
          >
            1 digit
          </p>
        </div>
        <div className=" leading-tight">
          <p
            className={`${oneSpecialChar ? 'text-validate' : 'text-warning '}  
      `}
          >
            1 special char
          </p>
          <p
            className={`${
              eightToTwentyChars ? 'text-validate' : 'text-warning '
            }  
      `}
          >
            8-20 chars
          </p>
        </div>
      </div>
    </>
  );
}

export default PwdFormat;
