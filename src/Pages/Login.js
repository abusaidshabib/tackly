import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import GoogleSignIn from './Shared/GoogleSignIn';

const Login = () => {

  const { logIn, passReset } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // navigate("/home");

    logIn(email, password)
      .then(result => {
        const user = result.user;
          navigate("/home");
      })
      .catch(error => {
        console.log(error)
      });
  }

  const handleReset = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    passReset(email)
      .then(() => {
        console.log("done")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  return (
    <div className="hero min-h-screen bg-gray-800">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center ml-10 max-lg:m-0 lg:text-left">
          <h1 className="text-5xl font-bold text-gray-200">Login now!</h1>
          <p className="py-6 text-gray-200">To access the full functionality of this app, you must log in using your registered email address and password. Logging in ensures that your account is secure and your personal information is protected. Once you have successfully logged in, you will be able to access all the features and content available to you as a registered user.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-200">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label" id="email">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" name="email" id="email" />
              </div>
              <div className="form-control">
                <label className="label" id="password">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" className="input input-bordered" name="password" id='password' />
                <label className="label">
                  <button onClick={handleReset} className="label-text-alt link link-hover">Forgot password?</button>
                </label>
                <label className="label">
                  If you have no account <Link className="link link-primary" to="/register">Register</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-primary tracking-widest" type="submit" value="Login" />
              </div>
            </form>
            <GoogleSignIn></GoogleSignIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;