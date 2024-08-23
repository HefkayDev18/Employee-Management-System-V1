// import { useAuth } from '../pages/Authentication/AuthContext';
// import { Navigate } from 'react-router-dom';

// type PrivateRouteProps = {
//   element: JSX.Element;
// };

// const PrivateRoute = ({ element }: PrivateRouteProps) => {
//   const { isLoggedIn } = useAuth();
//   return isLoggedIn ? element : <Navigate to="/auth/signin" replace />;
// };

// export default PrivateRoute;


import { useAuth } from '../pages/Authentication/AuthContext';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  element: JSX.Element;
  roles?: string[];
};

const PrivateRoute = ({ element, roles }: PrivateRouteProps) => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default PrivateRoute;
