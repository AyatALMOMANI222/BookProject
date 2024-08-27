import React, { useEffect,useState } from "react";
import "./style.scss";
import defaultImg from "../books/defaultImage.jpg";
import axios from "axios";
// const favoriteItems = [
//   {
//     id: 1,
//     name: "The Great Gatsby",
//     image: defaultImg,
//     description: "A classic novel by F. Scott Fitzgerald.",
//   },
//   {
//     id: 2,
//     name: "1984",
//     image: defaultImg,
//     description: "A dystopian novel by George Orwell.",
//   },
//   {
//     id: 3,
//     name: "To Kill a Mockingbird",
//     image: defaultImg,
//     description: "A novel by Harper Lee.",
//   },
// ];


const MyFavorite = () => {
  const [books,setBooks] =useState([])
  const fetchBooks = async () => {
    // Replace with your actual token
    const token = localStorage.getItem('token');
  
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/cart/myBook', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      console.log('Books:', response);
      setBooks(response.data)
      // Handle the response data as needed
    } catch (error) {
      console.error('Error fetching books:', error);
      // Handle errors as needed
    }
  };
  
  // Call the function to fetch books
  useEffect(()=>{
    fetchBooks();
  },[])

const handleClick=async(bookId)=>{
  const token = localStorage.getItem('token'); // Replace with your actual token retrieval logic

  try {
    // Perform the DELETE request
    const response = await axios.delete(
      'http://127.0.0.1:8000/api/cart/book',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
       
        },
        data: {
          book_id: bookId, // Pass bookId in the request body
        }
      }
    );
    
    console.log('Book removed from cart:', response.data);
    fetchBooks();
  } catch (error) {
    console.error('Error removing book from cart:', error.response ? error.response.data : error.message);
    // Handle errors as needed
  }
}

  return (
    
    <div className="my-favorite-page">
      <div className="my-favorite-title">My Favorites</div>
      <table className="favorite-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  className="favorite-image"
                />
              </td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button className="remove-btn"  onClick={() => handleClick(item.id)} >Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyFavorite;
