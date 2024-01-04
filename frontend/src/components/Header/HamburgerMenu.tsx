import { useState, MouseEvent, useRef } from 'react';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
import { headerStore } from '../../store/headerStore';
import { authStore } from '../../store/authStore';
import useOutsideClick from '../useOutsideClick';
import { logOut } from '../../services/API/users';

function HamburgerMenu() {
  const { setLoggedOut } = authStore();

  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const { locations } = headerStore();

  const hamburgerMenuRef = useRef<HTMLInputElement>(null);

  const toggleHamburgerMenu = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    event.stopPropagation();
    setShowHamburgerMenu(!showHamburgerMenu);
  };

  const handleOutsideClick = () => {
    setShowHamburgerMenu(false);
  };

  useOutsideClick(hamburgerMenuRef, handleOutsideClick, ['click']);

  const handleLogOut = () => {
    logOut();
    setLoggedOut();
  };

  return (
    <div ref={hamburgerMenuRef} className="main_container">
      <button
        type="button"
        className="hover:bg-secondaryColor relative z-40"
        onClick={toggleHamburgerMenu}
      >
        {showHamburgerMenu ? (
          <RxCross2 className="hamburgericon" />
        ) : (
          <RxHamburgerMenu className="hamburgericon" />
        )}
      </button>
      <div
        className={`${showHamburgerMenu ? '  active' : ' inactive'}  hamburger`}
      >
        <div
          className="py-1 flexdiv col sm:text-4xl text-3xl "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {locations.map((location) => (
            <NavLink
              key={location.label}
              className={({ isActive }) =>
                ` ${
                  isActive
                    ? 'bg-thirdColor text-secondaryText'
                    : 'hover:bg-secondaryColor'
                } w-36 rounded-sm `
              }
              to={location.url}
              onClick={toggleHamburgerMenu}
            >
              {location.label}
            </NavLink>
          ))}
          <NavLink
            key="account"
            className={({ isActive }) =>
              ` ${
                isActive
                  ? 'bg-thirdColor text-secondaryText'
                  : 'hover:bg-secondaryColor'
              } w-36 rounded-sm `
            }
            to="/account"
            onClick={toggleHamburgerMenu}
          >
            Account
          </NavLink>
          <button
            type="button"
            onClick={handleLogOut}
            className="w-36 rounded-sm  hover:bg-secondaryColor"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;
