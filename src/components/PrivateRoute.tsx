import { useAuth } from '../pages/Authentication/AuthContext';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  element: JSX.Element;
};

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/auth/signin" replace />;
};

export default PrivateRoute;

