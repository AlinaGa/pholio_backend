const Photographer = require("../models/photographer");

const createPhotographer = async (req, res) => {
  try {
    const { name, company, email, password } = req.body;
    const newEntry = await Photographer.create({
      name,
      company,
      email,
      password,
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
};
