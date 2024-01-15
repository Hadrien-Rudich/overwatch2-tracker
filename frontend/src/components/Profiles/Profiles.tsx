import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import { authStore } from '../../store/authStore';
import { profileStore } from '../../store/profileStore';
import AddProfile from './AddProfile';
import Profile from './Profile';
import useProfilesQuery from '../../hooks/profiles/useProfilesQuery';
import NotFound from '../NotFound';

function Profiles() {
  const navigate = useNavigate();

  const { isLoggedIn } = authStore();
  const { profilesData, isUpdatingProfile } = profileStore();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const {
    isLoading,
    isFetching,
    isError,
    //  isSuccess
  } = useProfilesQuery();

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="Profiles_container flexdiv col lg:my-[8.5rem] my-[4.5rem] relative">
      {isError && profilesData.length === 0 && (
        <NotFound
          propText="NO PROFILES FOUND"
          topPosition="lg:top-[-5.5rem] top-[-3.4rem]"
        />
      )}
      <div
        className={`${
          isUpdatingProfile ? 'grayscale pointer-events-none' : ''
        }  
      flexdiv sm:w-80 w-60 h-16 mb-12 bg-mainColor`}
      >
        <AddProfile />
      </div>
      <div className="containerbox">
        <div className="w-52 flex flex-col gap-4">
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default Profiles;
