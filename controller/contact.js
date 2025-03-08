const { default: mongoose } = require("mongoose");
const mobileBook = require("../model/contact");

const addcontact = async (req, res) => {
  try {
    const { fullName, mobileNumber, email } = req.body;

    const findUnique = await mobileBook.find();

    let isUnique = findUnique.find((ele) => {
      return ele.mobileNumber === mobileNumber;
    });

    if (isUnique) {
      res.json({ message: "Contact already exists" });
    } else {
      let contact = await mobileBook.insertOne({
        fullName,
        mobileNumber,
        email,
      });
      res.json(contact);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

const getContact = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    let contactList = await mobileBook
      .find()
      .skip(skip)
      .limit(Number(limit))
      .exec();

    const totalContacts = await mobileBook.countDocuments();

    res.json({
      totalContacts,
      totalPages: Math.ceil(totalContacts / limit),
      currentPage: Number(page),
      contacts: contactList,
    });
  } catch (error) {
    console.log("Error while fetching data", error);
    res.status(500).send("Server Error");
  }
};

const getContactById = async (req, res) => {
  try {
    const id = req.params.id;

    let Contact = await mobileBook.findById(id);
    res.json(Contact);
  } catch (error) {
    console.log("Error while fetching single contact");
    res.status(404).send(`Server Errror`);
  }
};

const getContactByMobile = async (req, res) => {
  try {
    const mobileNumber = req.params.mobileNumber;

    let contact = await mobileBook.findOne({ mobileNumber });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.log("Error while fetching single contact");
    res.status(500).send("Server Error");
  }
};

const getContactByName = async (req, res) => {
  const { fullName } = req.params;

  try {
    const contact = await mobileBook.findOne({
      fullName: fullName,
    });

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the contact" });
  }
};

const updateContact = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    let personContactInfo = await mobileBook.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!personContactInfo) {
      return res.status(404).json({ message: "not contact found" });
    }
    res.json(personContactInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update contact" });
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    let deleted = await mobileBook.findByIdAndDelete(id);
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to delete contact" });
  }
};

module.exports = {
  addcontact,
  getContact,
  updateContact,
  getContactById,
  deleteContact,
  getContactByMobile,
  getContactByName,
};
