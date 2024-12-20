import React, { useState, useEffect } from "react";
import axios from 'axios';
import './circulation.css';

function Circulation() {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const getAddedBooks = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://localhost:7183/api/User/lending-details`);
                setPackages(response.data);
                console.log(`Response------>${packages}`);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getAddedBooks();
    }, []);


    // const toggleFeedback = async (pacId) => {
    //     if (visibleFeedback === pacId) {
    //         setVisibleFeedback(null); 
    //     } else {
    //         try {
    //             const response = await axios.get(`https://localhost:7216/api/User/reviews/${pacId}`);
    //             setFeedbacks(prevFeedbacks => ({ ...prevFeedbacks, [pacId]: response.data }));
    //             setVisibleFeedback(pacId); 
    //         } catch (err) {
    //             alert('No feedbacks found..!!');
    //             console.log(`Error fetching feedback..${err}`);
    //         }
    //     }
    // };



    const handleReturn = async (bookID) => {
        try {
          const response = await axios.put(`https://localhost:7183/api/User/resetBookStatus/${bookID}`);
          if (response.status === 200) {
            alert('Successfully Returned..!!');
            getAddedBooks(); 
          } else {
            // alert('Failed to return..!!');
          }
        } catch (err) {
          console.log(`Error while booking package..${err}`);
        //   alert('Failed to return..!!');
        }
      };

    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className="main_ttl mt-4" style={{ textAlign: 'center', fontWeight: 'bold' }}>Circulations</h1>
                    {packages.map((pack) => (
                        <div key={pack.packageid} className="col-md-3 mb-4 mt-4">
                            <div className="card card1">
                                <div className="card-body">
                                    <h3 className="card-title rec_Name main_ttl">{pack.name}</h3>
                                    <p className="card-text expl main_ttl">Member: {pack.email}</p>
                                    <div className='card-body'>
                                        <button
                                            style={{fontSize: '18'}}
                                            className="btn book-now-btn mt-2"
                                            onClick={() => handleReturn(pack.bookid)}
                                        >
                                           Mark Returned
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Circulation;
