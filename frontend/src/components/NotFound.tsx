interface NotFoundProps {
  propText: string;
  topPosition: string;
}

function NotFound({ propText, topPosition }: NotFoundProps) {
  return (
    <div
      // className="absolute lg:top-[-5.5rem] top-[-3.4rem] lg:text-5xl text-4xl w-full text-activeColor "
      className={`absolute ${topPosition} lg:text-5xl text-4xl w-full text-activeColor `}
    >
      {propText}
    </div>
  );
}

export default NotFound;
