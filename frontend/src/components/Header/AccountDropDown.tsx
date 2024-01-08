import { useState, MouseEvent, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { authStore } from '../../store/authStore';
import useOutsideClick from '../useOutsideClick';
import { logOut } from '../../services/API/users';

function AccountDropDown() {
  const { setLoggedOut } = authStore();
  const [showAccountDropDown, setShowAccountDropDown] = useState(false);
  const accountDropDownRef = useRef<HTMLDivElement>(null);

  const toggleAccountDropdown = (
    event: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    event.stopPropagation();
    setShowAccountDropDown(!showAccountDropDown);
  };

  const handleLogOut = () => {
    logOut();
    setLoggedOut();
  };

  useOutsideClick(
    accountDropDownRef,
    () => {
      setShowAccountDropDown(false);
    },
    ['click']
  );

  return (
    <div
      onMouseLeave={toggleAccountDropdown}
      className="AccountDropDown_container relative z-40"
      ref={accountDropDownRef}
    >
      <button
        type="button"
        onMouseEnter={toggleAccountDropdown}
        className={`${
          showAccountDropDown
            ? 'bg-mainColor'
            : 'bg-activeColor hover:bg-fifthColor hover:shadow-md'
        }  accounticon flexdiv duration-[800ms]`}
      >
        <FaRegUser className="h-10 w-10 drop-shadow-md" />
      </button>
      <div className="relative">
        <ul
          className={`${
            showAccountDropDown ? 'active' : 'inactive'
          }  accountdropdown flexdiv col gap-2`}
        >
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'accountdropdownoption active p-2'
                  : 'accountdropdownoption inactive p-2'
              }
              to="/account"
            >
              Account
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className="accountdropdownoption inactive"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AccountDropDown;
