import React, { useContext, useEffect, useState } from "react";
import ContactContext from "../../contexts/ContactContext/ContactContext";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import { PERSONAL } from "../../configs/constants";
import Header from "../../layouts/Header/Header";
import axios from "axios";
import axiosInstance from "../../services/axiosInstance";
import ContactService from "../../services/contactServices";
import authContext from "../../contexts/AuthContext/authContext";
import Modal from "../../components/Modal/Modal";
import Footer from "../../layouts/Footer/Footer";
// const contactData = [
//   {
//     id: 1,
//     name: "Jill Johnson",
//     email: "jill@gmail.com",
//     phone: "111-111-1111",
//     type: "personal",
//   },
//   {
//     id: 2,
//     name: "Sara Watson",
//     email: "sara@gmail.com",
//     phone: "222-222-2222",
//     type: "personal",
//   },
//   {
//     id: 3,
//     name: "Harry White",
//     email: "harry@gmail.com",
//     phone: "333-333-3333",
//     type: "professional",
//   },
// ];

export const initialValues = {
  name: "",
  email: "",
  phone: "",
  type: PERSONAL,
};
const HomePage = () => {
  const [contacts, setContacts] = useState([]);
  const [show, setShow] = useState(true);
  const [numberPg, setNumberPg] = useState("")
  const [query, setQuery] = useState({
    keyword: "",
    pageNumber: ""
  })

  const [infCard, setInfCard] = useState("");
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const [showForm, setShowForm] = useState(false);

  
  const { tokenize, state } = useContext(authContext);

  const fetchContact = async () => {
    
    // const tokenLocalStorage = localStorage.getItem("token");
    try {

      // axiosInstance.defaults.headers.common["x-auth-token"] = tokenLocalStorage;
      // const contactResponse = await axiosInstance.get("/contact")

      const contactResponse = await ContactService.getAll(query.keyword,query.pageNumber)
      setNumberPg( contactResponse.data.numberPage);
      const contactsData = contactResponse.data.contacts;
      setContacts(contactsData);
    } catch (err) {}
  };

  const [contactForm, setContactForm] = useState(initialValues);
  useEffect(() => {
    if (!state.user) {
      tokenize();
      }
    fetchContact();
  }, [show]);

  const removeContact = async(id) => {
    const conf = window.confirm("Ban co chan chan muon xoa");
    if(conf){
      // await axiosInstance.delete(`/contact/${id}`)
      await ContactService.delete(id)
      .then(res => {
        alert("Xoa thanh cong!");
        setShow(pre => !pre);
      }).catch(err => alert("Xoa khong thanh cong!"));
    }
    // setContacts(contacts.filter((item) => item.id !== id));
  };
  const onAddContact = async (contact) => {
    const index = contacts.find((item) => item._id === contact._id);
    if (index) {
      // const newContact = [...contacts];
      // newContact.splice(index, 1, contact);
      // setContacts(newContact);
      // await axiosInstance.put(`/contact/${index._id}`, contact)
      await ContactService.update(index._id,contact)
      .then(res => {
        alert("Cap nhat thanh cong!");
        setShow(pre => !pre);
      }).catch(err => alert("Cap nhat khong thanh cong!"));
    } else {
      // setContacts((prev) => [
      //   ...prev,
      //   { ...contact, id: new Date().toDateString() },
      // ]);
      // await axiosInstance.post("/contact", contact)
      await ContactService.create(contact)
      .then(res =>{
        alert("Them thong tin thanh cong!");
        setShow(pre => !pre);
      }).catch(err => alert("Them thong tin khong thanh cong"));
    }
  };
  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      alert("Name is required!");
      return
    }
    if (!values.email) {
      alert("Email is required!");
      return
    } else if (!regex.test(values.email)) {
      alert("This is not a valid email format!");
      return
    }
    if (!values.phone) {
      alert("Phone is required");
      return
    }
    return values;
  };
  return (
    
    <div className="h-[100vh] bg-" >
      <Header />
      <div className="container p-4  h-[75vh] ">
        <ContactContext.Provider
          value={{
            contacts,
            setContactForm,
            removeContact,
            validate,
            toggleModal,
            modal,
            setInfCard,
            infCard
          }}
        >
        <div className="">
          <div className="row flex justify-center">
          {
            showForm && (
            <div className="col-12 col-md-6">
              <ContactForm
                onAddContact={onAddContact}
                contactForm={contactForm}
                setContactForm={setContactForm}
                setShowForm = {setShowForm}
              />
            </div>
            )
          }
          {
            !showForm && (
              <div className="col-12 col-md-6">
              <ContactList
                setShow ={setShow} 
                setQuery = {setQuery} 
                query = {query} 
                setShowForm = {setShowForm}
                numberPage = {numberPg}         
              ></ContactList>
            </div>
            )
          }
            
          </div>
        </div>
          <div className=""><Modal setShowForm = {setShowForm} ></Modal></div>
          
        </ContactContext.Provider>
      </div>
      <div className="h-[15vh]">

      <Footer ></Footer>
      </div>
    </div>
  );
};

export default HomePage;
