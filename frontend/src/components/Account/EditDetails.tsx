import { ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import { authStore } from '../../store/authStore';
import InputField from '../InputField';
import useAccountUpdateMutation from '../../hooks/account/useAccountUpdateMutation';

function EditDetails() {
  const { toggleEditAccount, userData, newEmail, setNewEmail, clearNewEmail } =
    authStore();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value);
  };

  // const handleBattleTagChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setNewBattleTag(event.target.value);
  // };

  const handleCancelClick = () => {
    toggleEditAccount();
    clearNewEmail();
    // clearNewBattleTag();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleCancelClick();
    }
  };

  const mutateUser = useAccountUpdateMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateUser();
  };

  return (
    <div className="main_container">
      <form action="submit" onSubmit={handleSubmit}>
        <div className="inputandbutton_container flexdiv col gap-8">
          <div className="input_container flexdiv col gap-4">
            <InputField
              label="Email"
              type="email"
              value={newEmail}
              placeholder={userData.email}
              disabled={false}
              required={false}
              onChange={handleEmailChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="button_container flexdiv gap-4">
            <button
              type="button"
              onClick={handleCancelClick}
              className="button cancel"
            >
              Cancel
            </button>
            <button type="submit" className="button validate">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditDetails;
