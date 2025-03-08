const express = require("express");
const {
  addcontact,
  getContact,
  updateContact,
  getContactById,
  deleteContact,
  getContactByMobile,
  getContactByName,
} = require("../controller/contact");

let route = express.Router();

route.post("/addContact", addcontact);
route.get("/getContact", getContact);
route.put(`/updateContact/:id`, updateContact);
route.get(`/getContactById/:id`, getContactById);
route.delete(`/deleteContact/:id`, deleteContact);
route.get(`/getContactMobileNumber/:mobileNumber`, getContactByMobile);
route.get("/getContactByName/:fullName", getContactByName);

module.exports = route;
