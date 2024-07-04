import { Link } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import PreAuthBanner from '../../components/PreAuthBanner';
import axios from 'axios';

const ResetPassword = () => {
 const [ email, setEmail ] = useState('');
 const API_BASE_URL = 'https://localhost:7267/api/Auth';

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await axios.post(`${API_BASE_URL}/forgotpassword`, { email });
    Swal.fire({
      icon: 'success',
      title: 'Reset Link Sent!',
      html: '<span style="color: green">A password reset link has been sent to your email address!</span>',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Reset Failed',
      // text: error.response?.data?.message || 'An error occurred while attempting to reset the password.',
      html: '<span style="color: red">Email is not attributed to any existing account!</span>',
    });
    
  }
  setEmail(''); 
};

  return (
    <div className="h-screen flex flex-col lg:flex-row xl:flex-row">
      <PreAuthBanner/>

      <div className="lg:w-1/2 xl:w-1/2 bg-gray-100">
        <div className="p-8 mt-12 md:w-3/4 mx-auto lg:px-0 xl:p-8 w-full">
          <h2 className="mb-8 text-3xl font-bold text-primary">
            Reset your password...
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mt-10">
              <label className="mb-2 block font-medium text-black">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-300 bg-transparent py-4 px-6 outline-none focus:border-primary focus-visible:shadow-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <span className="absolute right-4 top-4">
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                      fill=""
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button className="w-full cursor-pointer mt-16.5 bg-primary hover:bg-primary-hover text-white font-bold py-4 rounded-lg transition duration-300 ease-in-out">
              Reset
            </button>
          </form>
          <div className="mt-6 text-center">
            <p>
              Back to sign in?{' '}
              <Link to="/auth/signin" className="text-primary font-bold">
                Sign In
              </Link>
            </p>          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;