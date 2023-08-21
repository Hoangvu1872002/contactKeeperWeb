import React, { useContext } from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import AuthServices from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import authContext from '../../contexts/AuthContext/authContext';
import { REGISTER } from '../../contexts/types';

const RegisterPage = () => {
    const navigate = useNavigate();
    const onRegisterSubmit = async(values) => {
        try {
            console.log(values);
            // const onLoginRespone = await axiosInstance.post("/users/login", values)
         await AuthServices.register(values)
            navigate("/login")

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <RegisterForm onSubmit = {onRegisterSubmit}></RegisterForm>
        </div>
    );
};

export default RegisterPage;