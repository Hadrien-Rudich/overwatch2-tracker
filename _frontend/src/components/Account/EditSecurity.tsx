import { ChangeEvent, KeyboardEvent } from 'react';

import { authStore } from '../../store/authStore';
import InputField from '../InputField';

function EditSecurity() {
  const {
    toggleEditSecurity,
    newPassword,
    setNewPassword,
    clearNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    clearConfirmNewPassword,
  } = authStore();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleCancelClick = () => {
    toggleEditSecurity();
    clearNewPassword();
    clearConfirmNewPassword();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleCancelClick();
    }
  };

  return (
    <div className="main_container">
      <form action="submit">
        <div className="inputandbutton_container flexdiv col gap-8">
          <div className="input_container flexdiv col gap-4">
            <InputField
              label="Password"
              type="password"
              placeholder="*************"
              value={newPassword}
              disabled={false}
              required={false}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="*************"
              value={confirmNewPassword}
              disabled={false}
              required={false}
              onChange={handleConfirmPasswordChange}
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
            <button type="button" className="button validate">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditSecurity;
