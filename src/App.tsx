// import { lazy, Suspense, useEffect, useState } from 'react';
// import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import SignIn from './pages/Authentication/SignIn';
// import SignUp from './pages/Authentication/SignUp';
// import ResetPassword from './pages/Authentication/ResetPassword';
// import SetNewPassword from './pages/Authentication/SetNewPassword';
// import Loader from './common/Loader';
// import { AuthProvider, useAuth } from './pages/Authentication/AuthContext';
// import PrivateRoute from './components/PrivateRoute';
// import routes from './routes';
// import Dashboard from './pages/Dashboard/Dashboard';
// import { setAuthToken } from './services/ApiService';


// const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     if (token) {
//       setAuthToken(token);
//     }
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <AuthProvider>
//       <Toaster
//         position="top-right"
//         reverseOrder={false}
//         containerClassName="overflow-auto"
//       />
//       <Suspense fallback={<Loader />}>
//         <AuthRoutes />
//       </Suspense>
//     </AuthProvider>
//   );
// }

// function AuthRoutes() {
//   const location = useLocation();
//   const { isLoggedIn } = useAuth();

//   useEffect(() => {
//     if (!isLoggedIn && !location.pathname.startsWith('/auth')) {
//       <Navigate to="/auth/signin" replace />;
//     }
//   }, [isLoggedIn, location.pathname]);

//   return (
//     <Routes>
//       <Route path="/" element={<Navigate replace to="/auth/signin" />} />
//       <Route path="/auth/signin" element={<SignIn />} />
//       <Route path="/auth/signup" element={<SignUp />} />
//       <Route path="/auth/reset" element={<ResetPassword />} />
//       <Route path="/auth/resetpassword" element={<SetNewPassword/>} />
//       <Route element={<DefaultLayout />}>
//         <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
//         {routes.map((route, index) => (
//           <Route
//             key={index}
//             path={route.path}
//             element={<PrivateRoute element={<route.component />} />}
//           />
//         ))}
//       </Route>
//     </Routes>
//   );
// }

// export default App;




import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
import { setAuthToken } from './services/ApiService';
import { checkTokenExpiry } from './services/CheckTokenExpiry';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

function MainApp() {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      checkTokenExpiry(token, navigate, logout);
    }
    setLoading(false);

    const interval = setInterval(() => {
      const token = sessionStorage.getItem('token');
      if (token) {
        checkTokenExpiry(token, navigate, logout);
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [navigate, logout]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Suspense fallback={<Loader />}>
        <AuthRoutes />
      </Suspense>
    </>
  );
}

function AuthRoutes() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn && !location.pathname.startsWith('/auth')) {
      navigate('/auth/signin', { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/auth/signin" />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/reset" element={<ResetPassword />} />
      <Route path="/auth/resetpassword" element={<SetNewPassword />} />
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
