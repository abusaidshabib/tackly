import React from 'react';
import Header from '../Pages/Shared/Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div className='bg-gray-800'>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;