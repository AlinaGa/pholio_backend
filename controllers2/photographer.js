const pool = require("../db2");

const getPhotographers = async (req, res) => {
  try {
    // const result = await pool.query("SELECT * FROM photographers;");
    const { rows, rowCount } = await pool.query("SELECT * FROM photographers;");

    res.json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong");
  }
};

const getPhotographer = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } = await pool.query(
      "SELECT * FROM photographers WHERE id=$1;",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong");
  }
};

const getPhotographerByCompany = async (req, res) => {
  try {
    const { companyname } = req.params;
    const { rows, rowCount } = await pool.query(
      "SELECT * FROM photographers WHERE companyname = $1;",
      [companyname]
    );

    res.json(rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong");
  }
};


const createPhotographer = async (req, res) => {
  try {
    const { photographername, companyname, mail, password } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO photographers (photographername, companyname, mail, password) VALUES ($1, $2, $3, $4) RETURNING *;",
      [photographername, companyname, mail, password]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};

const updatePhotographer = async (req, res) => {
  try {
    const { id } = req.params;
    const { photographername, companyname, mail } = req.body;

    const { rows } = await pool.query(
      "UPDATE photographers SET photographername=$1, companyname=$2, mail=$3 WHERE id=$4 RETURNING *;",
      [photographername, companyname, mail, id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};

const deletePhotographer = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM photographers WHERE id=$1;", [id]);

    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("something went wrong");
  }
};

module.exports = {
  getPhotographers,
  getPhotographer,
  getPhotographerByCompany,

  createPhotographer,
  updatePhotographer,
  deletePhotographer,
};