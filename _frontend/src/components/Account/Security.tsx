import { authStore } from '../../store/authStore';
import EditSecurity from './EditSecurity';

function Details() {
  const { editSecurity, toggleEditSecurity } = authStore();

  const handleEditSecurityClick = () => {
    toggleEditSecurity();
  };

  return (
    <div className="main_container">
      {editSecurity ? (
        <div className="EditSecurity_container">
          <EditSecurity />
        </div>
      ) : (
        <div className="button_container">
          <button
            type="button"
            onClick={handleEditSecurityClick}
            className="button bg-warning truncate"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Details;
