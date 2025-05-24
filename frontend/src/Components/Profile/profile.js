import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/solid'; // Optional icons

const ProfilePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [lemail, setLemail] = useState(localStorage.getItem('email'));
  const [name, setName] = useState(localStorage.getItem('name'));

  useEffect(() => {
    setLemail(localStorage.getItem('email'));
    setName(localStorage.getItem('name'));
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user-details/${lemail}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    if (lemail) {
      fetchUserDetails();
    }
  }, [lemail]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8 sm:p-10">
        {data ? (
          <>
            <div className="flex items-center space-x-4 mb-6">
              <UserCircleIcon className="w-12 h-12 text-blue-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
                <p className="text-sm text-gray-500">{data.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
              <ProfileField label="Name" value={data.name} />
              <ProfileField label="DOB" value={data.dob} />
              <ProfileField label="Age" value={data.age} />
              <ProfileField label="Gender" value={data.gender} />
              <ProfileField label="Contact" value={data.contact} />
              <ProfileField label="Education" value={data.education} />
              <ProfileField label="Address" value={data.adress} />
              <ProfileField label="Pincode" value={data.pincode} />
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/updateUser', { state: data })}
                className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            {name && lemail ? (
              <>
                <p className="text-lg font-semibold">Welcome, {name}!</p>
                <p className="text-sm text-gray-500 mb-4">Email: {lemail}</p>
                <button
                  onClick={() => navigate('/profileform')}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                >
                  Complete Your Profile
                </button>
              </>
            ) : (
              <p className="text-lg">Please log in to view your profile.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800">{value || '-'}</span>
  </div>
);

export default ProfilePage;
