const db = require("../models");
const User = db.user;
const Set = db.set;

exports.getuser = (req, res) => {
    User.findById(req.userId, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send({
            id: user._id,
            email: user.email,
            username: user.username,
        });
    });
};

exports.getuserset = (req, res) => {
    Set.find({ userid: req.userId }, (err, sets) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.status(200).send(sets);
    }).select({ 'name': 1, 'userid': 1 });
};