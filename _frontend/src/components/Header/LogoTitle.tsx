function LogoTitle() {
  return (
    <div className="titleandimage_container flex flex-col items-start sm:text-4xl text-2xl z-50 xs:pt-2 xs:pl-4 pt-1 pl-2">
      <h1 className="sr-only">Overwatch 2 Game Tracker</h1>
      <div className="logo_container">
        <img
          className="logo_image xxs:h-9 xs:h-11 sm:h-12 md:h-14 lg:h-16 h-7"
          src="/images/Overwatch_2_text_logo.svg"
          alt="Overwatch 2 Logo"
          aria-hidden="true"
        />
        <div className="flex flex-col items-start">
          <span className="logo_text sr-only">Overwatch 2</span>
          <span className="logo_text">Game Tracker</span>
        </div>
      </div>
    </div>
  );
}

export default LogoTitle;
