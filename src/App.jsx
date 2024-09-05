// App.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import WelcomeCustomer from './components/customer/WelcomeCustomer';
import WelcomeDeliveryGuy from './components/delivery_guy/WelcomeDeliveryGuy';
import WelcomeRestaurantOwner from './components/Restaurant/WelcomeRestaurant';
import WelcomeManager from './components/manager/WelcomeManager';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import ManagerAccess from './components/manager/ManagerAccess';
import ManagerManageStaff from './components/manager/ManagerManageStaff';
import AddDish from './components/Restaurant/AddDish';
import UpdateMenu from './components/Restaurant/UpdateMenu';
import Fish from './components/customer/Fish';
import Chicken from './components/customer/Chicken';
import Egg from './components/customer/Egg';
import Paneer from './components/customer/Paneer';
import RestaurantDetails from './components/RestaurantDetails';
import HomeChicken from './components/HomeChicken';
import HomePaneer from './components/HomePaneer';
import HomeOrderMenu from './components/HomeOrderMenu';
import ManagerResto from './components/manager/ManagerResto';
import ManagerOrder from './components/manager/ManagerOrder';
import RestoOrder from './components/Restaurant/RestoOrder';
import CustomerOrder from './components/customer/customerOrder';
import DeliveryOrder from './components/delivery_guy/DeliveryOrder';
import SpoonPointer from './components/SpoonPointer';

function App() {
  return (
    <BrowserRouter>
      <SpoonPointer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/WelcomeCustomer" element={<ProtectedRoute element={WelcomeCustomer} />} />
        <Route path="/WelcomeDelivery" element={<ProtectedRoute element={WelcomeDeliveryGuy} />} />
        <Route path="/WelcomeRestaurant" element={<ProtectedRoute element={WelcomeRestaurantOwner} />} />
        <Route path="/WelcomeManager" element={<ProtectedRoute element={WelcomeManager} />} />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} /> 
        <Route path="/managerAccess" element={<ProtectedRoute element={ManagerAccess} />} />
        <Route path="/manage-staff" element={<ProtectedRoute element={ManagerManageStaff} />} />
        <Route path="/add-dish" element={<ProtectedRoute element={AddDish} />} />
        <Route path="/update-menu" element={<ProtectedRoute element={UpdateMenu} />} />
        <Route path="/fish" element={<ProtectedRoute element={Fish} />} />
        <Route path="/chicken" element={<ProtectedRoute element={Chicken} />} />
        <Route path="/egg" element={<ProtectedRoute element={Egg} />} />
        <Route path="/paneer" element={<ProtectedRoute element={Paneer} />} />
        <Route path="/restaurant-management" element={<ProtectedRoute element={ManagerResto} />} />
        <Route path="/order-analytics" element={<ProtectedRoute element={ManagerOrder} />} />
        <Route path="/view-orders" element={<ProtectedRoute element={RestoOrder} />} />
        <Route path="/my-order" element={<ProtectedRoute element={CustomerOrder} />} />
        <Route path="/delivery-view-orders" element={<ProtectedRoute element={DeliveryOrder} />} />
        <Route path="/restaurantDetails" element={<RestaurantDetails />} />
        <Route path="/chickenHome" element={<HomeChicken />} />
        <Route path="/paneerHome" element={<HomePaneer />} />
        <Route path="/orderExplore" element={<HomeOrderMenu/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
