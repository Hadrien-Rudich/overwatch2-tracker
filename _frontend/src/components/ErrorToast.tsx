interface SavedToastProps {
  toastText: string;
  booleanProp: boolean;
  widthProp: string;
  topProp: string;
  centeringProp: string;
}

function ErrorToast({
  toastText,
  booleanProp,
  widthProp,
  topProp,
  centeringProp,
}: SavedToastProps) {
  // useEffect(() => {
  //   setTimeout(() => {
  //     booleanPropSetter(false);
  //   }, 4000);
  // });

  return (
    <div
      className={`${booleanProp ? 'fadeIn' : ' '}  
      flexdiv col absolute
      ${widthProp} ${topProp} ${centeringProp}
      sm:h-8 h-6 z-50
      bg-errorBackground ring-[0.1rem] ring-warning 
       shadow-md rounded-sm`}
    >
      <p className="text-activeColor tracking-widest xl:text-base lg:text-sm text-xs">
        {toastText}
      </p>
    </div>
  );
}

export default ErrorToast;
