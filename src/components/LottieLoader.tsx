// spinner
import Lottie from 'lottie-react';
import notFound from '../assets/spinners/notFound.json';
import searching from '../assets/spinners/searching.json';
import thinking from '../assets/spinners/thinking.json';

export default function LottieLoader({ type }: { type: string }) {
  console.log(type);
  let loader: any;
  if (type === 'searching') loader = searching;
  if (type === 'not found') loader = notFound;
  if (type === 'thinking') loader = thinking;

  return (
    <div className="lottie-loader">
      <Lottie animationData={loader} loop={true} />
    </div>
  );
}
