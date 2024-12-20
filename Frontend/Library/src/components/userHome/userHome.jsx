import React, { useState, useEffect } from 'react';
import './userHome.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const userId = localStorage.getItem('userId');
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [feedback, setFeedBack] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm('Are you sure want to logout?')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const getAddedBooks = async () => {
    try {
      const response = await axios.get(`https://localhost:7183/api/User/livebooks`);
      setPackages(response.data);
      setFilteredPackages(response.data); // Initialize filtered packages with all packages
      console.log(`Response------>${response.data}`);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAddedBooks();
  }, []);

  useEffect(() => {
    const results = packages.filter(pack =>
      pack.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPackages(results);
  }, [searchTerm, packages]);





  const handleBookNow = async (recId) => {
    try {
      const response = await axios.post(`https://localhost:7183/api/User/lendBook`, {
        userid: userId,
        bookid: recId
      });
      if (response.status === 200) {
        alert('Your booking is success!');
        getAddedBooks(); 
      } else {
        alert('Failed to lend book..!!');
      }
    } catch (err) {
      console.log(`Error while booking package..${err}`);
      alert('Failed to lend book..!!');
    }
  };

  return (
    <>
      <header className='bg'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-4'>
              <h2 className='heading'>User Dashboard</h2>
            </div>
            <div className='col-8 btn-align'>
              <button className='btns' onClick={logOut}>LOGOUT</button>
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <h2 className='packages-heading mb-4'>Books Live Now</h2>
      <div className="container">
        <div className="row">
          {filteredPackages.map((pack) => (
            <div key={pack.bookid} className="col-md-4 mb-4">
              <div className="card card1">
                <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.name} />
                <div className="card-body">
                  <h3 className="card-title rec_Name main_ttl">{pack.name}</h3>
                  <p className="card-text expl main_ttl">Author: {pack.author}</p>
                  <p className="card-text expl main_ttl">Details: {pack.explanation}</p>
                </div>
                <div className='card-body'>
                  <button
                    className="btn book-now-btn mt-2"
                    onClick={() => handleBookNow(pack.bookid)}
                  >
                    Lend Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserHome;
