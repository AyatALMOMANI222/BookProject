import React, { useState } from "react";
import axios from "axios";
import Input from "../../CoreComponent/Input";
import FileUpload from "../../CoreComponent/FileUpload";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const CreateNewBook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bookImage, setBookImage] = useState(null); // تأكد من أن bookImage تبدأ بقيمة null
const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
console.log(bookImage);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (bookImage) {
      formData.append("image", bookImage); // تأكد من أن bookImage هو ملف صحيح
    } else {
      console.error("No image selected!"); // التحقق من وجود صورة
      return;
    }

    const token = localStorage.getItem('token');

    axios.post("http://127.0.0.1:8000/api/book", formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log("Book created successfully:", response.data);
        navigate("/")

      })
      .catch((error) => {
        console.error("There was an error creating the book!", error);
      });
  };

  return (
    <div className="create-book-page">
      <div className="title">Create New Book</div>
      <form onSubmit={handleSubmit} className="create-book-form">
        <Input
          label="Book Title"
          placeholder="Enter book title"
          inputValue={title}
          setInputValue={setTitle}
          type="text"
          required={true}
        />

        <Input
          label="Description"
          placeholder="Enter book description"
          inputValue={description}
          setInputValue={setDescription}
          type="text"
          required={true}
        />
        <Input
          label="Price"
          placeholder="Enter price"
          inputValue={price}
          setInputValue={setPrice}
          type="number"
          required={true}
        />

        <FileUpload
          label="Select an Image"
          inputValue={bookImage}
          setInputValue={setBookImage}
        />
        <button type="submit" className="submit-btn" >
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateNewBook;
