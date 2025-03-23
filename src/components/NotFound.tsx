// spinner
import Lottie from 'lottie-react';
import notFound from '../assets/spinners/notFound.json';

export default function NotFound() {
  return (
    <div className="lottie-loader">
      <Lottie animationData={notFound} loop={true} />
      <h3 className="none-found">Page Not Found</h3>
    </div>
  );
}
