import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../public/restaurantCSS/AddDish.css';

function AddDish() {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    quantity: '',
    price: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('image', image);
    data.append('type', formData.type);
    data.append('name', formData.name);
    data.append('quantity', formData.quantity);
    data.append('price', formData.price);

    try {
      await axios.post("http://localhost:5000/addDish", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Swal.fire('Success', 'Dish added successfully!', 'success');
      setFormData({
        type: '',
        name: '',
        quantity: '',
        price: ''
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error('Error adding dish:', error);
      Swal.fire('Error', 'Failed to add dish', 'error');
    }
  };

  return (
    <div className="add-dish-container">
      <form className="add-dish-form" onSubmit={handleSubmit}>
        <h2>Add Dish</h2>
        <div className="form-group">
          <label className="upload-label" htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && <img src={preview} alt="Image preview" className="image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            id="type"
            name="type"
            type="text"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Dish</button>
      </form>
    </div>
  );
}

export default AddDish;
