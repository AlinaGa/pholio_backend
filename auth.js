const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Photographer = require("./models/photographer");

//authentication
const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await Photographer.findOne({ email });

    if (user) throw Error("the new use already exists");

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await Photographer.create({ email, password: hashed });
    //creating a payload, means that only the email and the id will be shown  to access the rest of info you can check on the cookies and the info will be there

    const payload = {
      email: newUser.email,
      name: newUser.name,
      id: newUser._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "500m",
    });
    res.cookie("access_token", token, { maxAge: 5000 * 600 }).json(payload);
    res.json({ email: newUser });
    //add function for the client to log in as well
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // in order to get back all info and password you have to use the + before password
    //and usually when the password select is false on the schema
    const user = await Photographer.findOne({ email }).select("+password");

    if (!user) throw Error("the user doesn't exist");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Wrong passsword!!");

    const payload = {
      email: user.email,
      name: user.name,
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "500m",
    });

    res.cookie("access_token", token, { maxAge: 5000 * 600 }).json(payload);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const logout = async (req, res) => {
  try {
    //NB log jst create an empty cookie with 0 time to expire immediately
    res.cookie("access_token", "", { maxAge: 0 }).end();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//getting an error cannnot set headers after thes are sent to the client
// email is undefined???

const getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await Photographer.findById({ id });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  login,
  logout,
  signup,
  getProfile,
};