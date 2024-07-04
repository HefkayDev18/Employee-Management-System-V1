import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import ResetPassword from './pages/Authentication/ResetPassword';
import SetNewPassword from './pages/Authentication/SetNewPassword';
import Loader from './common/Loader';
import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import routes from './routes';
import Dashboard from './pages/Dashboard/Dashboard';
import { setAuthToken } from './services/apiService';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Suspense fallback={<Loader />}>
        <AuthRoutes />
      </Suspense>
    </AuthProvider>
  );
}

function AuthRoutes() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && !location.pathname.startsWith('/auth')) {
      <Navigate to="/auth/signin" replace />;
    }
  }, [isLoggedIn, location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/auth/signin" />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/reset" element={<ResetPassword />} />
      <Route path="/auth/resetpassword" element={<SetNewPassword/>} />
      <Route element={<DefaultLayout />}>
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<PrivateRoute element={<route.component />} />}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;



