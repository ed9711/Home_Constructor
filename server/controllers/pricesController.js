const knex = require("knex")(require("../knexfile").development);

exports.get = (req, res) => {
    knex("prices")
    .then((data) => {
        res.json(data[0]);
    }).catch((err) => {
        res.status(500).json({
            errorMessage: "Unable to retrieve prices from database",
            error: err
        })
    });
};