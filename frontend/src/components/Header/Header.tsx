import { NavLink } from 'react-router-dom';
import { authStore } from '../../store/authStore';
import { profileStore } from '../../store/profileStore';
import HamburgerMenu from './HamburgerMenu';
import AccountDropDown from './AccountDropDown';
import LogoTitle from './LogoTitle';
import Tabs from './Tabs';

function Header() {
  const { isLoggedIn } = authStore();
  const { selectedProfile } = profileStore();

  const renderLoggedInHeader = () => {
    if (selectedProfile.id) {
      return (
        <div className="flex  justify-center items-end bg-activeColor">
          <div className="Tabs_container hidden md:block">
            <Tabs />
          </div>

          <div className="menu_container">
            <div className="hamburgermenucontainer">
              <HamburgerMenu />
            </div>
            <div className="accountdropdowncontainer">
              <AccountDropDown />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="button_container flexdiv">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'headertab active' : 'headertab inactive'
          }
          to="/profiles"
        >
          Profiles
        </NavLink>

        <div className="menu_container hidden absolute md:block sm:top-0 top-2 md:right-6 right-4">
          <AccountDropDown />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`Header_container ${
        isLoggedIn ? 'bg-activeColor sticky top-0 z-30' : 'bg-activeColor'
      }`}
    >
      <div className="LogoTitle_container relative z-40">
        <LogoTitle />
      </div>
      <div className="">{isLoggedIn && renderLoggedInHeader()}</div>
    </div>
  );
}

export default Header;
