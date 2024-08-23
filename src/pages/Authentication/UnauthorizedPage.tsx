import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import Loader from '../../common/Loader';
import { useState, useEffect } from 'react';

const UnauthorizedPage = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
})
  return loading? (
    <Loader/>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <FaLock className="text-danger text-9xl mb-8" />
      <h1 className="text-4xl font-bold text-danger mb-4">Unauthorized</h1>
      <p className="text-lg text-danger font-bold mb-8">
        Sorry, you don't have access to this page.
      </p>
      <Link to="/dashboard" className="bg-primary text-white px-6 py-3 rounded-full hover:bg-danger transition">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default UnauthorizedPage;

