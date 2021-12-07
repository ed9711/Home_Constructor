const knex = require("knex")(require("../knexfile").development);

exports.getAll = (req, res) => {
    knex("home_model")
        .where({ user_id: req.params.userId })
        .then(data => {
            // console.log(data);
            if (!data) {
                return res.status(404).json({
                    message: "User not found"
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

exports.getOne = (req, res) => {
    knex("home_model")
        .where({ id: req.params.modelId, user_id:req.params.userId })
        .then(data => {
            if (!data.length) {
                return res.status(404).json({
                    message: "Model does not exist"
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
    knex("home_model")
        .insert({ id: null, style: req.body.style, land: req.body.land, location: req.body.location, age: req.body.age, user_id: req.body.userId })
        .then(data => {
            if (!data.length) {
                return res.status(400).json({
                    message: "Could not create new model"
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
    knex("home_model")
        .where({ id: req.params.modelId})
        .update({ style: req.body.style, land: req.body.land, location: req.body.location, age: req.body.age, user_id: req.body.userId })
        .then(data => {
            // console.log(data, Number(req.params.modelId), data!==Number(req.params.modelId));
            if (data!==1) {
                return res.status(400).json({
                    message: "Could not update model"
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
    knex("home_model")
        .where({ id: req.params.modelId})
        .del()
        .then(data => {
            // console.log(data, Number(req.params.modelId));
            if (data!==1) {
                return res.status(400).json({
                    message: "Could not delete model"
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