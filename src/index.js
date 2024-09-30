// dependencies
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// styles
import './index.css';
// pages
import App from './Components/App';
import AddUser from './Components/AddUser/AddUser';
import Users from './Components/User/Users';
import ViewUser from './Components/ViewUser/ViewUser';
import EditUser from './Components/EditUser/EditUser.jsx'

// rendering
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Users />} />
          <Route path='/adduser' element={<AddUser />} />
          <Route path='/view/:ID' element={<ViewUser />} />
          <Route path='/edit/:ID' element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
