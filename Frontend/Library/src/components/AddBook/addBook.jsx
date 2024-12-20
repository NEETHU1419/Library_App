import React, { useState } from "react";
import './addBook.css';
import axios from 'axios';

function AddBook() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [pacImg, setPacImg] = useState('');
  const [imgFile, setImgFile] = useState('');
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      setPacImg(base64);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addAnItem = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('https://localhost:7183/api/User/addBook', {
        name: name,
        author: price,
        explanation: details,
        imagebase64: pacImg
      });
      if (response.data.bookId != null) {
        alert('Book Added Successfully..!!');
        setName('');
        setPrice('');
        setDetails('');
        setImgFile('');
      } else {
        alert('Failed to add book..!!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to add book..!!');
    }
  };

  return (
    <>
      <div className='formAlign'>
        <div className='addForm'>
          <form onSubmit={addAnItem}>
            <legend>Add Your Book</legend>
            <div className="form-group">
              <label htmlFor="recipeName">Book Name</label>
              <input type="text" value={name} className="form-control" id="recipeName" onChange={(e) => setName(e.target.value)} required aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <label htmlFor="ingrediants">Author</label>
              <input type="text" value={price} className="form-control" onChange={(e) => setPrice(e.target.value)} required id="ingrediants" />
            </div>
            <div className="form-group">
              <label htmlFor="explanation">Explanation</label>
              <input type="text" value={details} className="form-control" onChange={(e) => setDetails(e.target.value)} required id="explanation" />
            </div>
            <div className="form-group">
              <label htmlFor="formFile">Book Image</label>
              <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBook;
