const express = require("express");
const {
  addcontact,
  getContact,
  updateContact,
  getContactById,
  deleteContact,
  getContactByMobile,
  getContactByName,
  Search,
  getContacts,
} = require("../controller/contact");

let route = express.Router();

route.post("/addContact", addcontact);
route.get("/getContacts", getContacts);
route.put(`/updateContact/:id`, updateContact);
route.get(`/getContactById/:id`, getContactById);
route.delete(`/deleteContact/:id`, deleteContact);
route.get(`/getContactMobileNumber/:mobileNumber`, getContactByMobile);
route.get("/getContactByName/:fullName", getContactByName);
route.get("/searchContacts", Search);

module.exports = route;
