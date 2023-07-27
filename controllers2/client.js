const pool = require("../db");


//  MUST BE UPDATED ACCORDING TO THE CONTENT OF THE TABLE



const getClients = async (req, res) => {
  try {
    const { rows, rowCount } = await pool.query("SELECT * FROM cli;");

    res.json(rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};

const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, rowCount } = await pool.query(
      "SELECT * from clients WHERE id=$1;",
      [id]
    );

    res.json(rows[0]);
  } catch (err) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};

const createClient = async (req, res) => {
  try {
    const { photographername, companyname, mail } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO clients (photographername, companyname, mail) VALUES $1, $2, $3) RETURNING *;",
      [photographername, companyname, mail]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { photographername, companyname, mail } = req.body;

    const { rows } = await pool.query(
      "UPDATE clients SET photographername=$1, companyname=$2, mail=$3 WHERE id=$4 RETURNING *;",
      [photographername, companyname, mail, id]
    );

    res.json(rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM clients WHERE id=$1;",
      [id]
    );

    res.json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};