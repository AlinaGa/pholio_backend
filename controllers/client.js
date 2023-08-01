const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utilities/ErrorResponse");
const Client = require("../models/client");

const createClient = async (req, res, next) => {
  try {
    const { id, company, name: pName } = req.user;
    const { email, name, password } = req.body;

    const user = await Client.findOne({ email });

    if (user) throw Error("the new use already exists");

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await Client.create({
      email,
      password: hashed,
      name,
      photographer: id,
    });
    //creating a payload, means that only the email and the id will be shown  to access the rest of info you can check on the cookies and the info will be there

    const payload = {
      email: newUser.email,
      name: newUser.name,
      id: newUser._id,
      photographer: { id, company, pName },
    };

    res.json(payload);
    //add function for the client to log in as well
  } catch (error) {
    next();
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //  +password selects info and password
    //and usually the password select is false on the schema
    const user = await Client.findOne({ email })
      .populate("photographer")
      .select("+password");

    if (!user) throw new ErrorResponse("the user doesn't exist", 404);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new ErrorResponse("Wrong passsword!!", 401);

    const payload = {
      email: user.email,
      name: user.name,
      id: user._id,
      photographer: {
        id: user.photographer._id,
        company: user.photographer.company,
        name: user.photographer.name,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "500m",
    });

    res.cookie("access_token", token, { maxAge: 5000 * 600 }).json(payload);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = async (req, res) => {
  try {
    //NB log jst create an empty cookie with 0 time to expire immediately
    res.cookie("access_token", "", { maxAge: 0 }).end();
  } catch (error) {
    next(error);
  }
};

const getClient = async (req, res) => {
  try {
    const newClient = await Client.find();
    res.json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPhotographerClients = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const newClient = await Client.find({ photographer: id });
    res.json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createClient,
  getClient,
  login,
  logout,
  getPhotographerClients,
};
