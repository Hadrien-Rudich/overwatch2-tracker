import { ProgressBar } from 'react-loader-spinner';

function LoadingSpinner() {
  return (
    <div className="flexdiv">
      <ProgressBar
        height="100"
        width="100"
        borderColor="#ffffff"
        barColor="#51E5FF"
      />
    </div>
  );
}

export default LoadingSpinner;
