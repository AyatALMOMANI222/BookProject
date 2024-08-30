import React, { useEffect, useState } from "react";
import defaultImg from "../books/defaultImage.jpg";
import axios from "axios";
import "./style.scss";

const MyFavorite = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/cart/myBook",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Books:", response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleClick = async (bookId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        "http://127.0.0.1:8000/api/cart/book",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            book_id: bookId,
          },
        }
      );

      console.log("Book removed from cart:", response.data);
      fetchBooks(); // Refresh the list after deletion
    } catch (error) {
      console.error(
        "Error removing book from cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

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
          {books?.map((item) => {
            const imageUrl = item.image
              ? `data:image/jpeg;base64,${item.image}`
              : null;

            return (
              <tr key={item.id}>
                <td>
                  <img
                    src={imageUrl || defaultImg} // استخدم الصورة الافتراضية إذا كانت `item.image` null
                    alt={item.title || "No Name Available"} // استخدم نص افتراضي إذا كان `item.name` null
                    className="favorite-image"
                  />
                </td>
                <td>{item.title || "No Name Available"}</td> {/* استخدم نص افتراضي إذا كان `item.name` null */}
                <td>{item.description || "No Description Available"}</td> {/* استخدم نص افتراضي إذا كان `item.description` null */}
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => handleClick(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyFavorite;
