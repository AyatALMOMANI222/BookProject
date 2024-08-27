import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

const Books = () => {
  const [books, setBooks] = useState([]);
 
  useEffect(() => {
const token =localStorage.getItem('token')
console.log(token);


    if (!token) {
      console.error("No token found in localStorage.");
      return;
    }

    axios.get("http://127.0.0.1:8000/api/allBook", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log(response.data);
      setBooks(response.data); // تخزين البيانات في حالة books
    })
    .catch(error => {
      console.error("Error fetching books:", error);
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized: Token may be invalid or expired.");
      }
    });
  }, []);
const handleClick=async(bookId)=>{    // Retrieve the token from localStorage or any other secure storage
    const token = localStorage.getItem('token'); // Replace with your actual token retrieval logic
  
    try {
      // POST request to add the book to the cart
      const response = await axios.post(
        'http://127.0.0.1:8000/api/cart/add-book',
        { book_id: bookId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
         }
        }
      );
      
      console.log('Book added to cart:', response.data);
      // Handle the response as needed
    } catch (error) {
      console.error('Error adding book to cart:', error.response ? error.response.data : error.message);
      // Handle errors as needed
    }
  
  
}
  return (
    <div className="book-list-container">
      <div className="book-list">
        {books.map((book) => (
          
          <div className="book-card" key={book.id}>
            <div className="book-info">
            <img className="book-image " src={book.image || "data:image/jpeg;base64,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"} alt={book.name} />
              <div className="book-name">{book.name}</div>
              <p className="book-price">{book.price}</p>
              <button className="add-to-favorite-btn" onClick={()=>handleClick(book.id)} >Add To Favorite</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
