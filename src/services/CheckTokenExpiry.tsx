// import Swal from 'sweetalert2';
// // import { useAuth } from '../pages/Authentication/AuthContext';

// interface TokenPayload {
//   sub: string;
//   jti: string;
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
//   "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
//   exp: number;
//   iss: string;
//   aud: string;
// }

// const base64UrlDecode = (str: string): string => {
//   try {
//     return decodeURIComponent(
//       atob(str.replace(/-/g, '+').replace(/_/g, '/'))
//         .split('')
//         .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//   } catch (e) {
//     console.error('Failed to decode base64Url:', e);
//     return '';
//   }
// };

// const parseJwt = (token: string): TokenPayload => {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64UrlDecode(base64Url);
//     return JSON.parse(base64) as TokenPayload;
//   } catch (e) {
//     console.error('Failed to parse JWT:', e);
//     throw new Error('Invalid token');
//   }
// };

// export const checkTokenExpiry = (token: string, navigate: any) => {
//   try {
//     const decodedToken = parseJwt(token);
//     const currentTime = Math.floor(Date.now() / 1000);

//     if (decodedToken.exp < currentTime) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Session Expired',
//         html: '<span style="color: orange">Your session has expired. Please log in again to continue.</span>',
//         showConfirmButton: false,
//         timer: 5000
//       }).then(() => {
//         sessionStorage.removeItem('token');
//         // logout();
//         navigate('/auth/signin');
//       });
//     }
//   } catch (e) {
//     console.error('Error checking token expiry:', e);
//     Swal.fire({
//       icon: 'error',
//       title: 'Error',
//       html: '<span style="color: red">An error occurred while checking the token. Please log in again.</span>',
//       showConfirmButton: true
//     }).then(() => {
//       sessionStorage.removeItem('token');
//     // logout();
//       navigate('/auth/signin');
//     });
//   }
// };



import Swal from 'sweetalert2';

interface TokenPayload {
  sub: string;
  jti: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number;
  iss: string;
  aud: string;
}

const base64UrlDecode = (str: string): string => {
  try {
    return decodeURIComponent(
      atob(str.replace(/-/g, '+').replace(/_/g, '/'))
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (e) {
    console.error('Failed to decode base64Url:', e);
    return '';
  }
};

const parseJwt = (token: string): TokenPayload => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64UrlDecode(base64Url);
    return JSON.parse(base64) as TokenPayload;
  } catch (e) {
    console.error('Failed to parse JWT:', e);
    throw new Error('Invalid token');
  }
};

export const checkTokenExpiry = (token: string, navigate: any, logout: () => void) => {
  try {
    const decodedToken = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        html: '<span style="color: orange">Your session has expired. Please log in again to continue.</span>',
        showConfirmButton: false,
        timer: 5000
      }).then(() => {
        sessionStorage.removeItem('token');
        logout();
        navigate('/auth/signin');
      });
    }
  } catch (e) {
    console.error('Error checking token expiry:', e);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      html: '<span style="color: red">An error occurred while checking the token. Please log in again.</span>',
      showConfirmButton: true
    }).then(() => {
      sessionStorage.removeItem('token');
      logout();
      navigate('/auth/signin');
    });
  }
};


