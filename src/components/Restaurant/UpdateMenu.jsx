import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import "../../../public/restaurantCSS/updateMenu.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateMenu() {
  const [dishes, setDishes] = useState([]);
  const [editDish, setEditDish] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:5000/getDishes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditDish({
      ...editDish,
      [name]: value
    });
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/updateDish/${id}`, editDish, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      Swal.fire('Success', 'Dish updated successfully', 'success');
      fetchDishes();
      setEditDish(null);
    } catch (error) {
      Swal.fire('Error', 'Failed to update dish', 'error');
      console.error('Error updating dish:', error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this dish!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:5000/deleteDish/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          Swal.fire('Deleted!', 'Your dish has been deleted.', 'success');
          fetchDishes();
        } catch (error) {
          Swal.fire('Error', 'Failed to delete dish', 'error');
          console.error('Error deleting dish:', error);
        }
      }
    });
  };

  return <>
  <h2 className="text-center text-white">Update Menu</h2>
    <div className="update-menu-container">
      <div className="update-menu-dish-list">
        {dishes.map(dish => (
          <div key={dish._id} className="update-menu-dish-item">
            <img src={`http://localhost:5000/uploads/${dish.image}`} alt={dish.name} className="update-menu-dish-image" />
            {editDish && editDish._id === dish._id ? (
              <div className="update-menu-edit-form">
                <div className="update-menu-label-value">
                  <span className="update-menu-label">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={editDish.name}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
                <div className="update-menu-label-value">
                  <span className="update-menu-label">Quantity:</span>
                  <input
                    type="text"
                    name="quantity"
                    value={editDish.quantity}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
                <div className="update-menu-label-value">
                  <span className="update-menu-label">Price:</span>
                  <input
                    type="text"
                    name="price"
                    value={editDish.price}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
                <div className="update-menu-button-container">
                  <button className="btn btn-success" onClick={() => handleUpdate(dish._id)}>Update</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(dish._id)}>Delete</button>
                </div>
              </div>
            ) : (
              <>
                <p className="update-menu-label-value"><span className="update-menu-label">Type:</span> <span className="update-menu-value">{dish.type}</span></p>
                <p className="update-menu-label-value"><span className="update-menu-label">Name:</span> <span className="update-menu-value">{dish.name}</span></p>
                <p className="update-menu-label-value"><span className="update-menu-label">Quantity:</span> <span className="update-menu-value">{dish.quantity}</span></p>
                <p className="update-menu-label-value"><span className="update-menu-label">Price:</span> <span className="update-menu-value">{dish.price}</span></p>
                <div className="update-menu-button-container">
                  <button className="btn btn-primary" onClick={() => setEditDish(dish)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(dish._id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </>
}

export default UpdateMenu;
