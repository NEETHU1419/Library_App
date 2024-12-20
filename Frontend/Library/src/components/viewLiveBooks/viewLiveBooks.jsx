import React, { useState, useEffect } from "react";
import axios from 'axios';
import './viewLiveBooks.css';

function ViewLiveBook() {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const getAddedBooks = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://localhost:7183/api/User/livebooks`);
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

    return (
        <>
            <div className="container">
                <div className="row">
                <h1 className="main_ttl mt-4" style={{textAlign: 'center',fontWeight:'bold'}}>Live Books</h1>
                    {packages.map((pack) => (
                        <div key={pack.packageid} className="col-md-3 mb-4 mt-4">
                            <div className="card card1">
                                <img src={`data:image/jpeg;base64,${pack.imagebase64}`} className="card-img-top" alt={pack.name} />
                                <div className="card-body">
                                    <h3 className="card-title rec_Name main_ttl">{pack.name}</h3>
                                    <p className="card-text expl main_ttl">Author: {pack.author}</p>
                                    <p className="card-text expl main_ttl">Details: {pack.explanation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ViewLiveBook;
