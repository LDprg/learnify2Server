const db = require("../models");
const User = db.user;

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