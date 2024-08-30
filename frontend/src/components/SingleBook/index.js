import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

import "./style.css";
const SingleBook = () => {
  const [book, setBook] = useState({});
  const { bookId } = useParams(); // تأكد من أنك تستورد useParams وتستخدمه للحصول على bookId من URL
const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://127.0.0.1:8000/api/one/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setBook(response.data); // تأكد من أن "book" هو اسم الخاصية في البيانات المستلمة
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: Token may be invalid or expired.");
        }
      });
  }, [bookId]); // إضافة bookId إلى قائمة التبعيات للتأكد من إعادة تنفيذ useEffect عند تغيير bookId

  // Render book details or a loading state
  if (!book) {
    return <div>Loading...</div>;
  }
  const handleClick = async (bookId) => {
    // Retrieve the token from localStorage or any other secure storage
    const token = localStorage.getItem("token"); // Replace with your actual token retrieval logic

    try {
      // POST request to add the book to the cart
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cart/add-book",
        { book_id: bookId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Book added to cart:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error(
        "Error adding book to cart:",
        error.response ? error.response.data : error.message
      );
      // Handle errors as needed
    }
  };
{  const imageUrl = book.image
  ? `data:image/jpeg;base64,${book.image}`
  : null;}
  return (
    <div className="single-book-container">
      {/* <h1>{book.title}</h1>
      <p>{book.description}</p>
      <p>Price: ${book.price}</p> */}
     
      <img
        className="image-book"
        src={`data:image/jpeg;base64,${book.image}` }
      />
      <div className="right-side">
        <div>{book.title}</div>
        <div className="price">Price:{book.price}$</div>
        {/* <div>Auther:{book.auther}</div> */}
        <hr />
        <div>
          Books are collections of written or printed words bound together in a
          cover. They are used for reading, studying, or reference and can cover
          a wide range of topics, including fiction, non-fiction, history,
          science, and more. Books can be in various formats such as hardcover,
          paperback, or digital. They serve as a source of knowledge,
          entertainment, and education.
        </div>
        <button className="btn" onClick={() =>{ handleClick(book.id)
           navigate("/favorite")}}>
          Add to Favourite
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
