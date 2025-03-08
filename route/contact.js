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
} = require("../controller/contact");

let route = express.Router();

route.post("/addContact", addcontact);
route.get("/getContacts", getContact);
route.put(`/updateContact/:id`, updateContact);
route.get(`/getContactById/:id`, getContactById);
route.delete(`/deleteContact/:id`, deleteContact);
route.get(`/getContactMobileNumber/:mobileNumber`, getContactByMobile);
route.get("/getContactByName/:fullName", getContactByName);
route.get("/Search", Search);

module.exports = route;
