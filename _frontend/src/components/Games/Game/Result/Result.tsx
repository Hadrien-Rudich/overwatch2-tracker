import { getResultClassNameFromGame } from '../../../../utils/classNameUtils';
import type { GameData } from '../../../../types/store/gameTypes';

function Result({ gameObj }: { gameObj: GameData }) {
  // Determine if the screen width is greater than the breakpoint (768px)
  const isLargeScreen = window.innerWidth > 768;

  // Create a className based on the screen size and other conditions
  const responsiveClasses = `${getResultClassNameFromGame(
    gameObj
  )} result_container w-[75%] h-8 flexdiv ${isLargeScreen ? '' : ''}`;

  return (
    <p className={responsiveClasses}>
      {isLargeScreen ? gameObj.result : gameObj.result.slice(0, 1)}
    </p>
  );
}

export default Result;
