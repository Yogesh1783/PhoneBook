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
    res.status(500).send({ error });
  }
};

const getContacts = async (req, res) => {
  let { recordLimit, recordPage } = req.query;
  const { page = recordPage, limit = recordLimit } = req.params;
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
    res.status(500).send({ error });
  }
};

const getContactById = async (req, res) => {
  try {
    const id = req.params.id;

    let Contact = await mobileBook.findById(id);
    res.json(Contact);
  } catch (error) {
    console.log("Error while fetching single contact");
    res.status(404).send({ error });
  }
};

const getContactByMobile = async (req, res) => {
  try {
    const mobileNumber = req.params.mobileNumber;

    let contact = await mobileBook.findOne({ mobileNumber });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error });
    }

    res.json(contact);
  } catch (error) {
    console.log("Error while fetching single contact");
    res.status(500).send(error);
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
    res.status(500).json({ error });
  }
};

const Search = async (req, res) => {
  try {
    let { recordLimit, recordPage } = req.query;
    const { page = recordPage, limit = recordLimit } = req.params;
    const skip = (page - 1) * limit;

    let keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({ error: "Search term is required" });
    }

    let Contacts = await mobileBook
      .find({
        $or: [
          { mobileNumber: { $regex: keyword, $options: "i" } },
          { fullName: { $regex: keyword, $options: "i" } },
        ],
      })
      .skip(skip)
      .limit(Number(limit))
      .exec();

    const totalContacts = await mobileBook.countDocuments();

    res.json({
      totalContacts,
      totalPages: Math.ceil(totalContacts / limit),
      currentPage: Number(page),
      contacts: Contacts,
    });
  } catch (error) {
    console.log(error);
    res.send({ error });
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
    res.status(500).json({ error });
  }
};

const deleteContact = async (req, res) => {
  const id = req.params.id;
  try {
    let deleted = await mobileBook.findByIdAndDelete(id);
    res.json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  addcontact,
  getContacts,
  updateContact,
  getContactById,
  deleteContact,
  getContactByMobile,
  getContactByName,
  Search,
};
