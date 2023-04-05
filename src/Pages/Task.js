import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Task = () => {

  const data = useLoaderData();

  return (
    <div className="bg-gray-700 text-center py-10 min-h-screen text-gray-200">
        <h2 className="text-4xl">{data.data.title}</h2>
        <p className='text-2xl'>{data.data.details}</p>
        <b>{data.data.time}</b>
    </div>
  );
};

export default Task;