import React, { useContext, useEffect, useState } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { AuthContext } from '../../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const MyTasks = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [tasks, setTasks] = useState();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://taskly-backend.vercel.app/tasks/${user?.email}`)
      .then(res => res.json())
      .then(data => setTasks(data.data.reverse()))
  }, [user?.email, tasks])

  const handleDelete = (task) => {
    fetch(`https://taskly-backend.vercel.app/tasks/${task?._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(data => {
        if (data.data.acknowledged) {
          toast.warning('Request accepted Successfully')
        }
        else {
          toast.error(data.message)
        }
      })

      .catch(error => console.error(error))
  }

  return (
    <div className='grid gap-y-5'>
      {
        tasks?.map(task => (
          <div key={task._id} className="card bg-gray-700 text-primary-content mx-20 max-md:mx-2">
            <div className="flex justify-between py-5 px-10">
              <div>
                <h3 className="card-title tracking-widest">{task.title}</h3>
                <p>
                  <b>Date:</b> {task.time.slice(0, 10)} &nbsp;
                  <b>Time:</b> {
                    task.time.slice(11, 12) === "0" ? "12" + task.time.slice(12, 18)
                      :
                      task.time.slice(11, 18)
                  }
                  <br />
                </p>
              </div>
              <div className="card-actions justify-end">
                <Link to={`/task/${task._id}`} className="btn btn-primary">
                  Details
                </Link>
                <label onClick={() => setSelectedItem(task)} className="btn btn-primary" htmlFor="my-modal-6">
                  <AiFillEdit className='text-lg' />
                </label>
                {
                  selectedItem && <Modal selectedItem={selectedItem} setSelectedItem={setSelectedItem}></Modal>
                }
                <button onClick={() => handleDelete(task)} className="btn btn-warning">
                  <AiFillDelete className='text-lg fill-gray-800' />
                </button>
              </div>
            </div>
          </div>
        ))
      }
      <ToastContainer />
    </div>
  );
};

export default MyTasks;