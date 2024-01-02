interface NotFoundProps {
  propText: string;
}

function NotFound({ propText }: NotFoundProps) {
  return (
    <div className="absolute lg:top-[-5.5rem] top-[-3.4rem] lg:text-5xl text-4xl w-full text-activeColor ">
      NO {propText} FOUND
    </div>
  );
}

export default NotFound;
