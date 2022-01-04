const knex = require("knex")(require("../knexfile").development);
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');


exports.authorize = (req, res, next) => {
    jwt.verify(req.body.token, "exampleSecretKey", (err, decoded) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: "no token"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    })
  }

exports.getOne = (req, res) => {
    // knex("user")
    //     .where({ id: req.params.userId })
    //     .then(data => {
    //         if (!data.length) {
    //             return res.status(404).json({
    //                 message: "User does not exist"
    //             })
    //         }

    //         res.json(data[0]);
    //     }).catch(err => {
    //         res.status(500).json({
    //             message: "Internal Error",
    //             error: err
    //         })
    //     });
    res.json(req.decoded.data);
};

exports.signUp = (req, res) => {
    knex("user")
    .where({ email: req.body.email })
    .then(data => {
        // console.log(data[0]);
        if (data[0]){
            return res.status(400).json({
                message: `Account with ${req.body.email} already exist`
            });
        } else {
            const saltRounds = 10;
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                knex("user")
                .insert({ 
                    id: null, 
                    email: req.body.email, 
                    password: hash, 
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
            });
        }
    })
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
            bcrypt.compare(req.body.password, data[0].password, (err, result) => {
                if (!result) {
                    res.status(403).json({
                        message: "Username or password incorrect"
                    })
                } else {
                    delete data[0].password;
                    const token = jwt.sign(
                        {data:data[0]},
                        "exampleSecretKey"
                    );
                    res.json({id: data[0].id, token:token});
                }
              });
        }).catch(err => {
            res.status(404).json({
                message: "Username incorrect",
                error: err
            })
        });
};