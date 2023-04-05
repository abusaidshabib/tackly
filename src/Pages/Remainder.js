import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import Modal from '../Components/Home/Modal';
import { Link } from 'react-router-dom';

const Remainder = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [tasks, setTasks] = useState();
  const { user} = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${user?.email}`)
      .then(res => res.json())
      .then(data => setTasks(data.data.sort((a, b) => {
        const dateA = new Date(a.string);
        const dateB = new Date(b.string);
        return dateA - dateB;
      })))
  }, [user?.email, tasks])


  let now = new Date();
  let isoString = now.toISOString();
  let temp1 = parseInt(isoString.slice(11, 13)) + 6;
  let temp2 = isoString.slice(13, 16)
  let temp = isoString.slice(0, 11);
  let current = temp + temp1 + temp2;


  const handleDelete = (task) => {
    fetch(`http://localhost:5000/tasks/${task?._id}`, {
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
    <div className='min-h-screen'>

      <h1 className='text-xl text-gray-200 text-center py-10'>Here tasks er on serial depending on time. You will saw notification of remaining task.</h1>
      <div className='grid gap-y-5'>
        {
          tasks?.map(task => (
            <div key={task._id} className={`${task?.string <= current ? "card bg-red-700 text-primary-content mx-20 max-md:mx-2" : "card bg-gray-700 text-primary-content mx-20 max-md:mx-2"}`}>
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
                  <Link to={`/task/${task?._id}`} className="btn btn-primary">
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default Remainder;