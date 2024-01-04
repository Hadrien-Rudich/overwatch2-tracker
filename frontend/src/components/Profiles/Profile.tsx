import { MouseEvent } from 'react';
import { profileStore } from '../../store/profileStore';
import UpdateProfile from './UpdateProfile';
import type { ProfileData } from '../../types/store/profileTypes';
import DeleteProfile from './DeleteProfile';
import EditProfile from './EditProfile';
import { getProfileCardClassName } from '../../utils/classNameUtils';

function Profile() {
  const {
    profilesData,
    selectedProfile,
    selectProfile,
    unselectProfile,
    isUpdatingProfile,
    isCreatingProfile,
    setProfileSavedToast,
  } = profileStore();

  const handleProfileClick = (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLInputElement>,
    profileObj: ProfileData
  ) => {
    setProfileSavedToast(false);
    const targetProfile = event.currentTarget.value;
    if (isUpdatingProfile) {
      return;
    }

    if (selectedProfile.label === targetProfile) {
      unselectProfile();
    } else {
      selectProfile(profileObj);
    }
  };

  return (
    // className={`${isCreatingGame ? 'bg-mainColor grayscale' : null}
    // Profile_container flex flex-col gap-4`}

    <div className="Profile_container flexdiv col gap-4 ">
      {profilesData.map((p) => (
        <div className="profile_container flexdiv gap-2 relative" key={p.label}>
          {isUpdatingProfile && p.label === selectedProfile.label ? (
            <UpdateProfile profileObj={p} />
          ) : (
            <button
              key={p.label}
              value={p.label}
              onClick={(event) =>
                handleProfileClick(event, {
                  ...p,
                })
              }
              type="button"
              className={getProfileCardClassName(
                p,
                selectedProfile,
                isUpdatingProfile,
                isCreatingProfile
              )}
            >
              <p
                className={`${
                  isUpdatingProfile || isCreatingProfile
                    ? 'opacity-40'
                    : 'opacity-100'
                }  `}
              >
                {p.label}
              </p>
            </button>
          )}

          {p.label === selectedProfile.label && !isUpdatingProfile && (
            <>
              <DeleteProfile profileObj={p} />
              <EditProfile profileObj={p} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Profile;
