import React, { useContext } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {

  const { googlePopUp } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleGPopUp = () => {
    googlePopUp(googleProvider)
      .then(result => {
        result = result.user;
        navigate(from, { replace: true });
      })
      .catch(error => console.error(error));
  }


  return (
    <div className='flex justify-center pt-5'>
      <FcGoogle className="text-4xl" onClick={handleGPopUp} />
    </div>
  );
};

export default GoogleSignIn;