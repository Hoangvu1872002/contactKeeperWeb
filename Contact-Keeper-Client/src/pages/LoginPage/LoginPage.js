import React, { useContext } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
// import axios from 'axios';
import authContext from '../../contexts/AuthContext/authContext';
import { LOGIN } from '../../contexts/types';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import AuthServices from '../../services/authServices';

const LoginPage = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(authContext);
    const onLoginSubmit = async(values) =>{
        
        try {
            // const onLoginRespone = await axiosInstance.post("/users/login", values)
            const onLoginRespone = await AuthServices.login(values)
            const action = {
                type: LOGIN,
                payload: onLoginRespone.data,
            }
            dispatch(action);
            navigate("/")

        } catch (error) {
            
        }
    }
    return (
        <div>
            <LoginForm onSubmit = {onLoginSubmit} ></LoginForm>
        </div>
    );
};

export default LoginPage;