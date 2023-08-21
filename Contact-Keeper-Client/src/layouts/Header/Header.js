import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import authContext from "../../contexts/AuthContext/authContext";
import { LOGOUT } from "../../contexts/types";
import { initialState } from "../../contexts/AuthContext/AuthState";
import LogoutForm from "../../components/LogoutForm/LogoutForm";
import LogoutPage from "../../pages/LogoutPage/LogoutPage";

const Header = (props) => {
  const {state, dispatch} = useContext(authContext);
  // const {isAuthenticated} = state;
  
  // console.log(state);
  
  return (
    <header className="h-[10vh]" >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          Contact Keeper
          </Link>
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0   ">
              <li className="nav-item ">
                <Link className="nav-link active text-dark" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Home">
                  About
                </Link>
              </li>
            </ul>
            { 
              state.user && state.user.name ? (
                <LogoutPage></LogoutPage>
              ):(<div></div>)
            }
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
