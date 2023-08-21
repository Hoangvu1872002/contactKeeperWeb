import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authContext from '../../contexts/AuthContext/authContext';
import AuthServices from '../../services/authServices';
import axiosInstance from '../../services/axiosInstance';
import Header from '../../layouts/Header/Header';
import Footer from '../../layouts/Footer/Footer';
import ContactService from '../../services/contactServices';
import { LOGOUT } from '../../contexts/types';
import { initialLogout } from '../LogoutForm/LogoutForm';

const ProfileForm = () => {
  // const { onSubmit } = props;
  const {tokenize, state, dispatch} = useContext(authContext);
  // console.log(state);
  const navigate = useNavigate();
  const [values, setValues] = useState(
    {
    name: "",
    email: "",
  }
  );
  const [hide, setHide] = useState(false);
  const handleRegister = async(event) => {
    event.preventDefault();
    const dataUpdateUser = validate(values);
    console.log(dataUpdateUser);
    await ContactService.updateManyContact(dataUpdateUser);
    await AuthServices.updateUserProfile(dataUpdateUser);
    tokenize();
    alert("Cap nhat thanh cong!")
    // onSubmit(dataRegister); 
  };

  const handleDeleteAcc = async() => {
    await ContactService.deleteManyContact();
    await AuthServices.deleteUser();
    const action = {
      type: LOGOUT,
      payload: initialLogout,
  }
  dispatch(action);
   navigate("/login")
  }

  useEffect(() => {
    // fetchUserProfile();
    if (!state.user) {
      // console.log("a");
      tokenize();
      // console.log("c");
    }
    setValues({
      ...values,
      ...state.user
    })
    // console.log("d");
  },[state])

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      alert("Name is required!");
      return;
    }
    if (!values.email) {
      alert("Email is required!");
      return;
    } else if (!regex.test(values.email)) {
      alert("This is not a valid email format!");
      return;
    }
    if(values.passworNow || values.passwordAgain || values.passwordNew){
      if (!values.passworNow) {
        alert("Passwor now is required!");
        return;
      }
      if (!values.passwordNew) {
        alert("Password new is required!");
        return;
      }
      if (!values.passwordAgain) {
        alert("Password again is required!");
        return;
      }
    }
    return values;
  };
  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
    <Header></Header>
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10 mt-5">
        <div>
        <div className="text-xl  flex items-center justify-center font-bold text-zinc-400 mb-4 mt-[-20px]">Profile</div>
          <input
            type="name"
            className="pl-3 rounded border border-gray-200 w-full mb-1 outline-none focus:border-blue-500"
            placeholder="Enter your name"
            name="name"
            value={values.name}
            disabled = {!hide}
            onChange={handleInputChange}
          ></input>
          <input
            type="email"
            className="pl-3 rounded border border-gray-200 w-full mb-1 outline-none focus:border-blue-500"
            placeholder="Enter your email"
            name="email"
            value={values.email}
            disabled ={!hide}
            onChange={handleInputChange}
          ></input>
          {!hide && (
            <input
            type="password"
            className="pl-3 rounded border border-gray-200 w-full mb-1 outline-none focus:border-blue-500"
            name="password"
            value="123456"
            disabled = {!hide}
            onChange={handleInputChange}
          ></input>
          )}
          
          {hide && (<input
            type="password"
            className="pl-3 rounded border border-gray-200 w-full mb-1 outline-none focus:border-blue-500"
            placeholder="Enter the password now"
            name="passworNow"
            onChange={handleInputChange}
          ></input>)}
          {hide && (<input
            type="password"
            className="pl-3 rounded border border-gray-200 w-full mb-1 outline-none focus:border-blue-500"
            placeholder="Enter the password new"
            name="passwordNew"
            onChange={handleInputChange}
          ></input>)}
          {hide && (<input
            type="password"
            className=" pl-3 rounded border border-gray-200 w-full mb-1 outline-none focus:border-blue-500"
            placeholder="Enter the password again"
            name="passwordAgain"
            onChange={handleInputChange}
          ></input>)}
          <div className='flex'>
          <span
            className="p-3 bg-pink-500 text-white text-sm w-full font-medium rounded-lg"
             onClick={() => setHide(pre => !pre)}
          >
            {hide ? (
              <span>Exit</span>
            ):(
              <div>Edit</div>
            )}
          </span>
          {
            !hide && (
          <span
            
            className="p-3 bg-pink-500 text-white text-sm w-full font-medium rounded-lg"
            disabled = {hide}
            onClick={handleDeleteAcc}
          >
            Delete Acc
          </span>
            )
          }
          {
            hide && (
          <span
            
            className="p-3 bg-pink-500 text-white text-sm w-full font-medium rounded-lg"
            disabled = {hide}
            onClick={()=>{
              handleRegister();
              setHide(pre => !pre)
              }}
          >
            Save
          </span>
            )
          }
          </div>
          
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProfileForm;