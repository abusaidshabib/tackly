import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AuthContext } from '../../Context/UserContext';

const Header = () => {

  const { user, logOut } = useContext(AuthContext);
  const [data, SetData] = useState();

  let now = new Date();
  let isoString = now.toISOString();
  let temp1 = parseInt(isoString.slice(11, 13)) + 6;
  let temp2 = isoString.slice(13, 16)
  let temp = isoString.slice(0, 11);
  let current = temp + temp1 + temp2;

  useEffect(() => {
    fetch(`https://taskly-backend.vercel.app/tasks/${user?.email}`)
      .then(res => res.json())
      .then(data => SetData(data.data.filter((item) => item.string >= current)))
  }, [current, user?.email, data])

  return (
    <div className="navbar bg-gray-800 px-20 py-3 text-gray-200 max-md:p-0">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle text-2xl">
            <HiMenuAlt1 />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-700 rounded-box w-52">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/remainder">Remainders</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className='btn btn-ghost normal-case font-semibold tracking-widest text-2xl'>
          TASKLY
        </Link>
      </div>
      <div className="navbar-end">
        {
          user?.uid ?
            <button onClick={logOut} className='btn btn-primary tracking-widest'>Logout</button>
            :
            <Link className='btn btn-primary tracking-widest' to="/login">Login/register</Link>
        }
      </div>
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <IoMdNotificationsOutline className='text-2xl text-gray-200' />
          <span className="badge badge-sm indicator-item">{data?.length}</span>
        </div>
      </label>

    </div>
  );
};

export default Header;