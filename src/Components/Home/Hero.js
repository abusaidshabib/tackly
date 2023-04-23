import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hero = () => {

  const { user } = useContext(AuthContext)
  const [status, setStatus] = useState(false)

  console.log(user);

  let now = new Date();
  let isoString = now.toISOString();
  let temp1 = parseInt(isoString.slice(11, 13)) + 6;
  let temp2 = isoString.slice(13, 16)
  let temp = isoString.slice(0, 11);
  let formattedString = temp + temp1 + temp2;

  // 2023 - 04 - 05T18: 32

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    let hour = date.getHours();
    let amPM = 'AM';
    if (hour > 12) {
      hour -= 12;
      amPM = 'PM';
    }
    const minutes = ('0' + date.getMinutes()).slice(-2);
    return `${year}-${month}-${day},${hour}:${minutes}${amPM}`;
  }

  const active = "flex justify-between items-center py-5 px-5 border border-gray-700 rounded-md w-6/12 max-md:w-full";
  const unActive = "flex justify-between items-center py-5 px-5 border border-gray-200 rounded-md w-6/12 max-lg:w-full";



  const handleTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const details = form.details.value;
    const time = formatDate(form.time.value);
    const string = form.time.value;
    const email = user?.email;

    const task = {
      email, title, details, time, string
    }

    console.log(task)

    fetch('https://taskly-backend.vercel.app/tasks', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => {
        form.reset();
        toast.success("Task add successfully")
      })
      .catch(error => console.log(error));
  }

  let content;


  if (status) {
    content =
      <form onSubmit={handleTask} className='w-full grid gap-y-8'>
        <input type="text" name="title" className="mt-1 w-full px-3 py-5 text-xl text-gray-200 bg-transparent border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 placeholder:tracking-wider placeholder:text-xl" placeholder="Add Task Title" required />

        <input type="text" name="details" className="mt-1 w-full px-3 py-5 text-xl text-gray-200 bg-transparent border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 placeholder:tracking-wider placeholder:text-xl" placeholder="Add Task Description" required />

        <label className='text-xl text-gray-200'>
          Enter task end date
        </label>

        <input type="datetime-local" name="time" className="mt-1 w-full px-3 py-5 text-xl tracking-widest text-gray-200 bg-transparent border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 placeholder:tracking-wider placeholder:text-xl" placeholder="Add Task Description" defaultValue={formattedString} required />

        <input type="submit" className='btn btn-primary tracking-widest' value="Add A Task" />
      </form>
  }

  else {
    content = <p onClick={() => setStatus(!status)} className='text-gray-500 text-lg tracking-wider leading-5'>Add a task</p>;
  }

  return (
    <div className='p-20 justify-center flex max-md:py-5 max-md:px-0'>
      <div className={status ? active : unActive}>
        {content}
        {
          !status ?
            <button onClick={() => setStatus(!status)} className='btn btn-primary tracking-widest'>Add Task</button>
            :
            <>
            </>
        }
      </div>
      <ToastContainer />
    </div>
  );
};

export default Hero;