import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';
import { authStore } from '../../store/authStore';
import { gameStore } from '../../store/gameStore';
import { useGamesQuery } from '../../hooks/games/useGamesQuery';
import Game from './Game';
import NotFound from '../NotFound';

function Games() {
  const navigate = useNavigate();

  const { isLoggedIn } = authStore();
  const { gamesData } = gameStore();
  const {
    isLoading,
    isFetching,
    isError,
    // isSuccess
  } = useGamesQuery();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  if (isLoading || isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <div className="Games_container lg:my-[8.5rem] my-[4.5rem] container mx-auto rounded-sm relative">
      {isError && gamesData.length === 0 && (
        <NotFound
          propText="NO GAMES FOUND"
          topPosition="lg:top-[-5.5rem] top-[-3.4rem]"
        />
      )}

      <div className="Game_container">
        <Game />
      </div>
    </div>
  );
}

export default Games;
