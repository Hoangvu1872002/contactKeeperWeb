import React, { useContext, useState } from 'react'
import contactContext from '../../contexts/ContactContext/ContactContext'
import './ContactCard.css'
import Modal from '../Modal/Modal';
const ContactCard = ({ card, handleShowContactForm }) => {
  const ctxContact = useContext(contactContext);
//
  // const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // }
  
  const handleCard = () => {
    ctxContact.setInfCard(card)
    ctxContact.toggleModal()
  }

  return (
    <>
    {/* <Modal modal ={modal} toggleModal = {toggleModal}></Modal> */}
    <div className="content rounded-lg grid grid-flow-row-dense grid-cols-5">
    
      <div className="info col-span-4">
        <span className="card bg-gray-400 ">{card.name}</span>
        {/* <p className='type'>{card.type}</p> */}
      </div>
      {/* <p className="email">Email: {card.email}</p> 
      <p className="phone">Phone: {card.phone}</p>
      <p className='user'>Added by user: {card.user}</p> */}
      <div className="gr-button flex items-center">
        <button
          className="edit-button rounded-lg bg-sky-400 text-emerald-700 border-neutral-300 border-solid border-2"
          // onClick={() => {
          //   ctxContact.setContactForm(card);
          //   handleShowContactForm()
          //   }}
          onClick={handleCard}
        >
          View
        </button>
        <button
          className="delete-button rounded-lg ml-1 bg-red-600 text-slate-200 border-orange-100 border-solid border-2 "
          onClick={() => ctxContact.removeContact(card._id)}
        >
          Delete
        </button>
      </div>
    </div>
    </>
  )
}

export default ContactCard
