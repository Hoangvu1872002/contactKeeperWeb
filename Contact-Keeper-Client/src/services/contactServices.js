import axiosInstance from "./axiosInstance";

const ContactService = {
  getAll: (keyword,pageNumber) => axiosInstance.get(`/contact?keyword=${keyword}&pageNumber=${pageNumber}`),
  delete: (id) => axiosInstance.delete(`/contact/deleteContact/${id}`),
  update: (id, contact) => axiosInstance.put(`/contact/updateContact/${id}`, contact),
  create: (contact) => axiosInstance.post("/contact", contact),
  updateManyContact: (values) => axiosInstance.put("contact/updateManyContact",values),
  deleteManyContact: () => axiosInstance.delete("contact/deleteManyContact"),
};

export default ContactService;
