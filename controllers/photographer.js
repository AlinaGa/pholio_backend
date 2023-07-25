// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const Photographer = require("../models/photographer");
const { login, logout, signup, getProfile } = require("../auth");

// authentication;
// const signup = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     const user = await Photographer.findOne({ email });

//     if (user) throw Error("the new use already exists");

//     const hashed = await bcrypt.hash(password, 10);

//     const newUser = await Photographer.create({ email, password: hashed });
//     //creating a payload, means that only the email and the id will be shown  to access the rest of info you can check on the cookies and the info will be there

//     const payload = {
//       email: newUser.email,
//       name: newUser.name,
//       id: newUser._id,
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "500m",
//     });
//     res.cookie("access_token", token, { maxAge: 5000 * 600 }).json(payload);
//     res.json({ email: newUser });
//     //add function for the client to log in as well
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     // in order to get back all info and password you have to use the + before password
//     //and usually when the password select is false on the schema
//     const user = await Photographer.findOne({ email }).select("+password");

//     if (!user) throw Error("the user doesn't exist");

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) throw new Error("Wrong passsword!!");

//     const payload = {
//       email: user.email,
//       name: user.name,
//       id: user._id,
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "500m",
//     });

//     res.cookie("access_token", token, { maxAge: 5000 * 600 }).json(payload);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };
// const logout = async (req, res) => {
//   try {
//     //NB log jst create an empty cookie with 0 time to expire immediately
//     res.cookie("access_token", "", { maxAge: 0 }).end();
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

// //getting an error cannnot set headers after thes are sent to the client
// // email is undefined???

// const getProfile = async (req, res) => {
//   try {
//     const { id } = req.user;
//     const user = await Photographer.findById({ id });
//     res.json(user);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

//schemas
const createPhotographer = async (req, res) => {
  try {
    const { name, email, password, company, clientname } = req.body;
    const newEntry = await Photographer.create({
      name,
      email,
      password,
      company,
      clientname,
    });
    res.json(newEntry);
    console.log("req.body", req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPhotographer = async (req, res) => {
  try {
    const photographer = await Photographer.find();
    res.json(photographer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPhotographerByCompany = async (req, res) => {
  try {
    const { company } = req.params;
    const photographer = await Photographer.find({ company });
    if (!photographer.length) {
      return res.status(404).json({ message: "No entries found" });
    }
    res.json(photographer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePhotographer = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const photographer = await Photographer.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        email: email,
      },
      {
        new: true,
      }
    );
    res.json(photographer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePhotographer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhotographer = await Photographer.findByIdAndDelete({ id });
    if (!deletePhotographer) {
      return res.status(500).json({ message: "Photographer not found" });
    }
    res.json(deletedPhotographer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  createPhotographer,
  getPhotographer,
  getPhotographerByCompany,
  updatePhotographer,
  deletePhotographer,
  // login,
  // logout,
  // signup,
  // getProfile,
};
