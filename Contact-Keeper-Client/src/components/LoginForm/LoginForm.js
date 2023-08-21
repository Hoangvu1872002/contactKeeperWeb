import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  const { onSubmit } = props;
  const navigate = useNavigate();
  function handleClick() {
    navigate("/register");
  }
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (event) => {
    event.preventDefault();
    const dataLogin = validate(values);
    onSubmit(dataLogin);
  };
  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      alert("Email is required!");
      return;
    } else if (!regex.test(values.email)) {
      alert("This is not a valid email format!");
      return;
    }
    if (!values.password) {
      alert("password is required");
      return;
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
    <div className="mt-[15%]">
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handleLogin}>
        <div className="text-xl  flex items-center justify-center font-bold text-zinc-400 mb-4 mt-[-20px]">LOGIN</div>
          <input
            type="email"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your email"
            name="email"
            onChange={handleInputChange}
          ></input>
          <input
            type="password"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your password"
            name="password"
            onChange={handleInputChange}
          ></input>
          <button
            type="submit"
            className="p-3 bg-pink-500 text-white text-sm w-full font-medium rounded-lg"
          >
            SignIn
          </button>
          <div className="mt-3 mb-[-20px] ml-4">
            Do you not have an account?
            <span className="pl-3 text-cyan-400 cursor-pointer underline" onClick={handleClick}>Go to register</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
