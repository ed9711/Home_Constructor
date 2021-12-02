const knex = require("knex")(require("../knexfile").development);

exports.getOne = (req, res) => {
    knex("user")
        .where({ id: req.params.userId })
        .then(data => {
            if (!data.length) {
                return res.status(404).json({
                    message: "User does not exist"
                })
            }

            res.json(data[0]);
        }).catch(err => {
            res.status(500).json({
                errorMessage: "Internal Error",
                error: err
            })
        });
};

exports.postOne = (req, res) => {
    knex("user")
        .insert({ id: null, salary: req.body.salary })
        .then(data => {
            console.log(data);
            if (!data.length) {
                return res.status(400).json({
                    message: "Could not create new user"
                })
            }

            res.json(data);
        }).catch(err => {
            res.status(500).json({
                errorMessage: "Internal Error",
                error: err
            })
        });
};

exports.putOne = (req, res) => {
    knex("user")
        .where({ id: req.params.userId})
        .update({ salary: req.body.salary })
        .then(data => {
            if (data!==Number(req.params.userId)) {
                return res.status(400).json({
                    message: "Could not update user"
                })
            }

            res.json(data);
        }).catch(err => {
            res.status(500).json({
                errorMessage: "Internal Error",
                error: err
            })
        });
};

exports.deleteOne = (req, res) => {
    knex("user")
        .where({ id: req.params.userId})
        .del()
        .then(data => {
            console.log(data);
            if (data!==Number(req.params.userId)) {
                return res.status(400).json({
                    message: "Could not delete user"
                })
            }

            res.json(data);
        }).catch(err => {
            res.status(500).json({
                errorMessage: "Internal Error",
                error: err
            })
        });
};