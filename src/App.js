import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Routes/router';
import UserContext from './Context/UserContext';
function App() {
  return (
    <div>
      <UserContext>
        <RouterProvider router={router}></RouterProvider>
      </UserContext>
    </div>
  );
}

export default App;
