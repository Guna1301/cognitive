import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: '',
    fname: '',
    lname: '',
    dob: '',
    email: '',
    age: '',
    gender: '',
    contact: '',
    education: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://cognitive-backend.onrender.com/api/users', userData);
      navigate('/Successpage');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6">Registration Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            name="name"
            placeholder="User name"
            required
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fname"
            placeholder="First name"
            required
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="lname"
            placeholder="Last name"
            required
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="dob"
            required
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="age"
            placeholder="Age"
            required
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <select
            name="gender"
            required
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Choose gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="contact"
            placeholder="Contact no"
            required
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="education"
            placeholder="Education"
            required
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            rows="4"
            required
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              type="text"
              name="state"
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Pin Code</label>
            <input
              type="text"
              name="pincode"
              required
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
