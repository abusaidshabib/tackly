import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Modal = ({ selectedItem, setSelectedItem }) => {

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

  const handleUpdate = (event) => {
    event.preventDefault();
    setSelectedItem(null)

    const form = event.target;
    const title = form.title.value;
    const details = form.details.value;
    const string = form.sting.value;
    const time = formatDate(form.sting.value);

    const task = {
      title, details, string, time
    }

    fetch(`https://taskly-backend.vercel.app/tasks/${selectedItem?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => {
        if (data.data.acknowledged) {
          toast.success('Updated Successfully')
        }
        else {
          toast.error(data.message)
        }
      })

      .catch(error => console.error(error))
  }

  return (
    <div className='bg-gray-800'>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-800">
          <form onSubmit={handleUpdate} className='w-full grid gap-y-8'>
            <input
              type="text" name="title" className="mt-1 w-full px-3 py-5 text-xl text-gray-200 bg-transparent border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 placeholder:tracking-wider placeholder:text-xl" placeholder="Add Task Title" defaultValue={selectedItem?.title} />

            <input
              type="text" name="details" className="mt-1 w-full px-3 py-5 text-xl text-gray-200 bg-transparent border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 placeholder:tracking-wider placeholder:text-xl" placeholder="Add Task Description" defaultValue={selectedItem?.details} />

            <label className='text-xl text-gray-200'>
              Enter task end date
            </label>

            <input
              type="datetime-local" name="sting" className="mt-1 w-full px-3 py-5 text-xl tracking-widest text-gray-200 bg-transparent border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 placeholder:tracking-wider placeholder:text-xl" placeholder="Add Task Description" defaultValue={selectedItem?.string} />
            <input className='btn btn-primary tracking-widest' type="submit" value="Update Data" />
          </form>

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;