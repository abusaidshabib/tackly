import React, { memo } from 'react';
import Hero from '../Components/Home/Hero';
import MyTasks from '../Components/Home/MyTasks';
import useTitle from '../hook/UseTitle/UseTitle';

const Home = memo(() => {

  useTitle("Home")

  return (
    <div className='w-full min-h-screen pb-10 bg-gray-800'>
      <Hero></Hero>
      <MyTasks></MyTasks>
    </div>
  );
});

export default Home;