import { useEffect } from 'react';

interface GameSavedToastProps {
  toastText: string;
  setToastText: (text: string) => void;
  isVisible: boolean;
  setIsVisible: (boolean: boolean) => void;
}

function SuccessToast({
  toastText,
  setToastText,
  isVisible,
  setIsVisible,
}: GameSavedToastProps) {
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
      setToastText('');
    }, 3000);
  });

  return (
    <div
      className={`${isVisible ? 'fadeIn' : null}  
      flexdiv fixed bottom-[0.2rem] right-[0.25rem]
      z-50
      lg:w-[20%] sm:w-[30%] w-[50%]
      h-10
      bg-savedBackground ring-[0.1rem] ring-validate
       shadow-md rounded-sm `}
    >
      <p className="text-activeColor lg:text-lg text-sm  tracking-widest ">
        {toastText}
      </p>
    </div>
  );
}

export default SuccessToast;
