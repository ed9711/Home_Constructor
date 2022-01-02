const knex = require("knex")(require("../knexfile").development);
const jwt = require('jsonwebtoken')

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
                message: "Internal Error",
                error: err
            })
        });
};

exports.signUp = (req, res) => {
    knex("user")
        .insert({ 
            id: null, 
            email: req.body.email, 
            password: req.body.password, 
            salary: req.body.salary 
        })
        .then(data => {
            console.log(data);
            if (!data.length) {
                return res.status(400).json({
                    message: "Could not create new user"
                })
            }
            // return id
            res.json(data[0]);
        }).catch(err => {
            res.status(500).json({
                message: "Internal Error",
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
                message: "Internal Error",
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
                message: "Internal Error",
                error: err
            })
        });
};

exports.login = (req, res) => {
    knex("user")
        .where({ email: req.body.email})
        .then(data => {
            // console.log(data[0].password, req.body.password);
            if (data[0].password !== req.body.password) {
                return res.status(403).json({
                    message: "User name or password incorrect"
                })
            }

            const token = jwt.sign(
                {id:data[0]},
                "exampleSecretKey"
              );
            res.json({id: data[0].id, token:token});
        }).catch(err => {
            res.status(404).json({
                message: "User name incorrect",
                error: err
            })
        });
};