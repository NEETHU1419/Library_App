import React, { useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import AddBook from '../AddBook/addBook';
import ViewAddedBook from '../viewAddedBooks/viewAddedBooks';
import ViewLiveBook from '../viewLiveBooks/viewLiveBooks';
import Circulation from '../circulation/circulation';

function Home() {
  const [addFormShow, setAddFormShow] = useState(false);
  const [viewAddedItem, setViewAddedItem] = useState(false);
  const [viewPackBookings, setViewPackBookings] = useState(false);
  const [viewLiveBook, setViewLiveBook] = useState(false);
  const [cir, setCir] = useState(false);
  
  const navigate = useNavigate();

  const viewAddedItems = () => {
    console.log('View working..!!');
    setAddFormShow(false);
    setViewAddedItem(true);
    setViewPackBookings(false);
    setViewLiveBook(false);
    setCir(false);
  };

  const viewLiveBooks = () => {
    setAddFormShow(false);
    setViewAddedItem(false);
    setViewPackBookings(false);
    setViewLiveBook(true);
    setCir(false);
  };

  const addItems = () => {
    console.log('Add working..!!');
    setAddFormShow(true); 
    setViewAddedItem(false);
    setViewPackBookings(false);
    setViewLiveBook(false);
    setCir(false);
  };

  const logOut = () => {
    if (window.confirm('Are you sure want to logout?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const circulation = () => {
    console.log('Circulation Working..!!');
    setViewPackBookings(false);
    setViewAddedItem(false);
    setAddFormShow(false);
    setViewLiveBook(false);
    setCir(true);
  };

  return (
    <>
      <header className='bg1'>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <h2 className='heading'>Librarian Dashboard</h2>
            </div>
            <div className='col-8 btn-align'>
              <button className='btns' onClick={addItems}>ADD BOOK</button>
              <button className='btns' onClick={viewAddedItems}>VIEW ADDED BOOKS</button>
              <button className='btns' onClick={viewLiveBooks}>VIEW LIVE BOOKS</button>
              <button className='btns' onClick={circulation}>CIRCULATION</button>
              <button className='btns' onClick={logOut}>LOGOUT</button>
            </div>
          </div>
        </div>
      </header>

      {addFormShow && <AddBook />}
      {viewAddedItem && <ViewAddedBook />}
      {viewLiveBook && <ViewLiveBook />}
      {cir && <Circulation />}
    </>
  );
}

export default Home;
