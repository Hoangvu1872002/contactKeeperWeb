const asyncHandler = require("express-async-handler");
const contactModel = require("../model/contactModel");

// const getContact = asyncHandler(async (req, res) => {
//     try {
//         const contacts = await contactModel.find({
//              user : req.user.name
//         });
//         res.json({
//             contacts
//         })
//     } catch (error) {
//         res.status(401);
//             throw new Error('Khong lay duoc danh sach thong tin!');
//     }
// });
const getContact = asyncHandler(async (req, res) => {
  try {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword;
    const searchQuery = keyword
      ? { name: { $regex: keyword }, user: req.user.name }
      : { user: req.user.name };

    console.log("a");
    console.log(searchQuery);

    const totalcontact = await contactModel.countDocuments(searchQuery);
    console.log("b");
    const numberPage = Math.ceil(totalcontact / pageSize);
    console.log("c");
    console.log(totalcontact);
    const contacts = await contactModel
      .find(searchQuery)
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({
      contacts,
      totalcontact,
      numberPage,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Khong lay duoc danh sach san pham!");
  }
});

const createContact = asyncHandler(async (req, res) => {
  const ContactFind = await contactModel.findOne({
    email: req.body.email,
  });

  if (ContactFind) {
    res.status(400);
    throw new Error("email da ton tai!");
  } else {
    try {
      const newContact = new contactModel({
        user: req.user.name,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
      });

      const ContactInsert = await contactModel.insertMany(newContact);

      if (ContactInsert) res.status(200).json(newContact);
    } catch (error) {
      res.status(401);
      throw new Error("them khong thanh cong!");
    }
  }
});

const deleteContactByID = asyncHandler(async (req, res) => {
  const check = req.params.id.match(/^[0-9a-fA-F]{24}$/);
  console.log(check);
  if (check) {
    const contactDelete = await contactModel.findOne({ _id: req.params.id });
    if (contactDelete) {
      try {
        await contactModel.deleteOne({
          _id: req.params.id,
        });
        res.status(200).send("Xoa thanh cong!");
      } catch (error) {
        res.send("loi!");
      }
    } else {
      res.status(401);
      throw new Error("Khong tim thay id!");
    }
  } else {
    res.status(401);
    throw new Error("Khong tim thay id!");
  }
});

const updateContact = asyncHandler(async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const contactUpdate = await contactModel.findOne({
      _id: req.params.id,
    });
    if (contactUpdate) {
      try {
        // console.log(req.body);
        (contactUpdate.user = req.user.name),
          (contactUpdate.name = req.body.name),
          (contactUpdate.email = req.body.email),
          (contactUpdate.phone = req.body.phone),
          (contactUpdate.type = req.body.type),
          await contactUpdate.save();
        const contact = await contactModel.findById({ _id: req.params.id });
        res.json(contact);
      } catch (error) {
        res.status(401);
        throw new Error("cap nhat khong thanh cong!");
      }
    } else {
      res.status(401);
      throw new Error("Khong tim thay id abc!");
    }
  } else {
    res.status(401);
    throw new Error("Khong tim thay idd!");
  }
});

const updateManyContact = asyncHandler(async (req, res) => {
  
  try {
    // console.log(req.user.name);
    // console.log(req.body.name);
  
    // console.log("a");
    
        await contactModel.updateMany({"user": req.user.name}, {"$set": {"user": req.body.name}});
          
          console.log("a");
          const contactsUpdate = await contactModel.find({
            user: req.body.name,
          });
    
     res.json(contactsUpdate);
  } catch (error) {
    res.status(400);
    throw new Error("loi lyyfffffffffffon!");
  }
});

const deleteManyContact = asyncHandler(async (req, res) => {
  
  try {    
    console.log("a");
        await contactModel.deleteMany({"user": req.user.name});
        console.log("b");
        const contactsUpdate = await contactModel.find({
            user: req.user.name,
          });
    
     res.json(contactsUpdate);
  } catch (error) {
    res.status(400);
    throw new Error("loi lyyfffffffffffon!");
  }
});

module.exports = {
  getContact,
  createContact,
  deleteContactByID,
  updateContact,
  updateManyContact,
  deleteManyContact
};
