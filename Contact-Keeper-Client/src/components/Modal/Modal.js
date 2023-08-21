import React, { useContext } from "react";
import contactContext from "../../contexts/ContactContext/ContactContext";
import './Modal.css';
const Modal = (props) => {
  const ctxContact = useContext(contactContext);

  const infCard = ctxContact.infCard;

  const handleShowContactForm = () => {
    props.setShowForm((pre) => !pre)
  }

  return (
    <div>
      {ctxContact.modal && (
        <div className="modall">
        <div className="overlay"></div>
        <div className="modal-content">
        <div className="inf">
        <p>Email: {infCard.email}</p> <br></br>
        <p>Name: {infCard.name}</p>  <br></br>
        <p>Phone: {infCard.phone}</p>  <br></br>
        <p>Type: {infCard.type}</p>  <br></br>
        <p>Added by user: {infCard.user}</p>  <br></br>
        <p>Id: {infCard._id}</p> 
        <div>
          <button onClick={() => {
            ctxContact.setContactForm(infCard);
             handleShowContactForm();
             ctxContact.toggleModal();
            }}>
            Edit</button>
        </div>            
        </div>
          <button className="close-modal" onClick={ctxContact.toggleModal}>
            X
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
