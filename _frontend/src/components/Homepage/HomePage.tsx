import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { authStore } from '../../store/authStore';

function HomePage() {
  const { isLoggedIn } = authStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profiles');
    }
  });

  return (
    <div className="homepage_container flexdiv lg:mt-44 my-24">
      <div className="button_container containerbox">
        <Link to="/login">
          <button className="button bg-fourthColor" type="submit">
            LOG IN
          </button>
        </Link>
        <Link to="/register">
          <button className="button validate" type="submit">
            REGISTER
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
