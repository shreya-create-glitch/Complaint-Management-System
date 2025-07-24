


import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import AuthPage from './components/AuthPage';
import { Toaster } from 'react-hot-toast';
import Complaint from './Pages/Complaint';
import ShowComplaint from './Pages/showComplaint';
import EditStatus from './components/EditStatus';
import CommentSection from './Pages/CommentSection';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />


 






      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<AuthPage></AuthPage>}></Route>
        <Route path="/complaint" element={<Complaint></Complaint>}></Route>
        <Route path="/see" element={<ShowComplaint></ShowComplaint>}></Route>
        <Route path="/edit/:id" element={<EditStatus />} />
        <Route path="/comment" element={<CommentSection></CommentSection>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
