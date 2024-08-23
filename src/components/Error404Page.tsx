import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import Loader from '../common/Loader';
import { useState, useEffect } from 'react';

const Error404Page = () => {
const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
    setLoading(false);
})

  return loading? (
    <Loader/>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FaExclamationTriangle className="text-warning text-9xl mb-8" />
      <h1 className="text-4xl font-bold text-warning mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-warning mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/dashboard" className="bg-primary mt-1 text-white px-6 py-3 rounded-full hover:bg-warning transition">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Error404Page;

