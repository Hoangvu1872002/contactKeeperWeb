import React, { useContext, useState } from 'react'
import { PERSONAL, PROFESSIONAL } from '../../configs/constants'
import contactContext from '../../contexts/ContactContext/ContactContext'
import { initialValues } from '../../pages/HomePage/HomePage'

const ContactForm = (props) => {
  // Props
  const { onAddContact, contactForm, setContactForm } = props
  const ctxContact = useContext(contactContext)
  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    onAddContact(ctxContact.validate(contactForm) );
    setContactForm(initialValues);
    // setTimeout(()=> {
    //   props.setShowForm((pre) => !pre);
    // }, 1000)
    
  }
  const handleShowContactForm = () =>{
    props.setShowForm((pre) => !pre)
  }
 
  const { _id, name, email, phone, type } = contactForm
  const isDisabledSubmitButton = !name && !email && !phone

  return (
    <div className="contact-form-container">
      <h4 className="flex justify-center font-bold text-lg">Contact Form</h4>
      <form className='mt-10' onSubmit={onSubmitHandler} action="POST">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Fullname:
          </label>
          <input
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            className="form-control"
            id="phone"
            name="phone"
            value={phone}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3 ">
          <div>
            <p>Contact types:</p>
            <div className="d-flex">
              <div className="form-check me-3">
                <input
                  className="form-check-input "
                  type="radio"
                  name="type"
                  id="personalType"
                  checked={type === PERSONAL}
                  onChange={onChangeHandler}
                  value={PERSONAL}
                />
                <label className="form-check-label" htmlFor="personalType">
                  Personal
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="professionalType"
                  checked={type === PROFESSIONAL}
                  onChange={onChangeHandler}
                  value={PROFESSIONAL}
                />
                <label className="form-check-label" htmlFor="professionalType">
                  Professional
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='flex'>

        <button
          type="submit"
          className="btn hover:bg-slate-300 w-100 text-dark border-1 border-solid border-emerald-600 cursor-pointer mr-5"
         disabled={isDisabledSubmitButton}
        >
          Submit
        </button>
        <button className='showContactForm bg-slate-300 hover:bg-slate-400 w-20 rounded-lg border-solid border-1 border-red-400' 
      onClick={handleShowContactForm}>
        Exit
      </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
