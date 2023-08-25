import React, { useContext, useState } from "react";
import contactContext from "../../contexts/ContactContext/ContactContext";
import ContactCard from "../ContactCard/ContactCard";
import "./ContactList.css";
import Modal from "../Modal/Modal";
import { initialValues } from "../../pages/HomePage/HomePage";
const ContactList = ({ setShow, setQuery, query, numberPage, setShowForm }) => {
  const ctxContact = useContext(contactContext);
  // const [search, setSearch] = useState('')
  // const filterContact = ctxContact.contacts?.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase()),
  // )
  const onHandleSearch = (event) => {
    setQuery({
      ...query,
      [event.target.name]: event.target.value,
    });
    setShow((pre) => !pre);
  };

  const handleShowContactForm = () =>{
    setShowForm((pre) => !pre);
    ctxContact.setContactForm(initialValues)
  }
  return (
    <div>
      <h1 className="flex justify-center font-bold text-lg">Contact List</h1>
      Filter Contact:
      <input
        className="border-zinc-400 border-1 rounded-lg mr-5 mt-[25px] mb-4 ml-5 pl-3 w-[150px] focus:border-teal-500"
        type="text"
        name="keyword"
        value={query.keyword}
        onChange={onHandleSearch}
      />
      <input
        className="border-zinc-400 border-1 rounded-lg mr-1.5 w-9 pl-3 mt-[25px] mb-4 ml-8 focus:border-teal-500"
        type="text"
        name="pageNumber"
        value={query.pageNumber}
        onChange={onHandleSearch}
      />
      of {numberPage} page
      <button className='showContactForm ml-[223px] p-2 bg-slate-300 hover:bg-gray-400 border-solid border-2 rounded-lg order-yellow-900'
      onClick={handleShowContactForm}>
        Add Contact
      </button>
      <div className="contact-list grid grid-rows-3 grid-flow-col gap-4">
        {ctxContact.contacts?.map((item) => (
          <ContactCard key={item._id} card={item}></ContactCard>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
