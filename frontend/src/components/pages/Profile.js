import React, { useState } from 'react'
import Nav from '../Nav'
import LoginAgain from '../LoginAgain';
import Logout from '../Logout';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();

  const data = localStorage.getItem("userprofiledata");
  let obj = JSON.parse(data);
  // console.log(obj.email);

  

  return (

    <div>
      <Nav />
      <div className='justify-content-end align-items-center mt-4 mx-5 d-flex'>
        <img style={{ width: "50px", height: "50px" }} src='https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp' />
        <span className='px-2'>
          {
            obj ? (
              <div className='d-flex flex-column'>
                <span>
                  {obj.email}
                  </span>
                
              </div>
            ) : (
              <div className='flex-column d-flex'>
                  <span>No email available</span>
                 <button className='btn btn-success'><Link className='text-white text-decoration-none' to="/login">Login</Link></button> 
                  
              </div>
              
            )
          }
          </span>
      </div>
      

    </div>
  )
}

export default Profile
