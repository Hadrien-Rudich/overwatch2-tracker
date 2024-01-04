import { FormEvent } from 'react';
import { ImPlus } from 'react-icons/im';
import useMockGameAddMutation from '../../hooks/games/useMockGameAddMutation';

function CreateMockGames() {
  const mutateGame = useMockGameAddMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateGame();
  };
  return (
    <div className="flexdiv">
      <form onSubmit={handleSubmit} action="submit">
        <button className="flexdiv gap-4 sign" type="submit">
          <ImPlus className="lg:h-[1.35rem] lg:w-[1.35rem] h-[1.55rem] w-[1.55rem]" />
          <p className=" text-2xl">Add mock games</p>
        </button>
      </form>
    </div>
  );
}

export default CreateMockGames;
