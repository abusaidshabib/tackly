import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import useTitle from '../hook/UseTitle/UseTitle';
import GoogleSignIn from './Shared/GoogleSignIn';

const Register = () => {

  useTitle("Register");

  const { createUser, updateUser, verify } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.pass.value

    console.log(name,email,pass);


    createUser(email, pass)
      .then(result => {
        const user = result.user;
        const userData = {
          displayName: name
        }
        updateUser(userData)
          .then(() => {
            verify()
              .then(() => {
                const user = result.user;
                form.reset();
                navigate(from, { replace: true });
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      })

  }

  return (
    <div className="hero min-h-screen bg-gray-800">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center ml-10 max-lg:m-0 lg:text-left">
          <h1 className="text-5xl font-bold text-gray-200">Register now!</h1>
          <p className="py-6 text-gray-200">To access the full functionality of this app, you must log in using your registered email address and password. Logging in ensures that your account is secure and your personal information is protected. Once you have successfully logged in, you will be able to access all the features and content available to you as a registered user.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-200">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label" id='name'>
                  <span className="label-text">Enter Your Full Name</span>
                </label>
                <input type="text" name='name' id='name' placeholder="Enter Your Full Name" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" id="email" placeholder="Enter Your Email" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='pass' placeholder="Enter Your Password" className="input input-bordered" />
                <label className="label">
                  if You already have registered <Link className="link link-primary" to="/login">Login</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <input type='submit' value="Register" className="btn btn-primary tracking-widest" />
              </div>
            </form>
            <GoogleSignIn></GoogleSignIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;



