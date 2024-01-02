import { authStore } from '../../store/authStore';
import EditDetails from './EditDetails';
import InputField from '../InputField';

function Details() {
  const { userData, toggleEditAccount, editAccount } = authStore();

  const handleEditClick = () => {
    toggleEditAccount();
  };

  return (
    <div className="main_container">
      {!editAccount ? (
        <div className="inputandbutton_container flexdiv col gap-8">
          <div className="input_container flexdiv col gap-4">
            <InputField
              label="Email"
              type="email"
              value={userData.email}
              disabled
              required={false}
            />

            {/* <InputField
              label="BattleTag"
              type="text"
              value={userData.battleTag}
              disabled
              required={false}
            /> */}
          </div>
          <div className="button_container flexdiv col gap-4">
            <button
              type="button"
              onClick={handleEditClick}
              className="button bg-warning"
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <div className="EditDetails_container">
          <EditDetails />
        </div>
      )}
    </div>
  );
}

export default Details;
