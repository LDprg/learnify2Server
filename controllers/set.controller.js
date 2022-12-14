const db = require("../models");
const Set = db.set;

exports.setinfo = (req, res) => {
    Set.findById(req.params.id, (err, set) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!set) {
            return res.status(404).send({ message: "Set Not found." });
        }

        res.status(200).send({
            id: set._id,
            name: set.name,
            userid: set.userid,
            length: set.data.length,
        });
    });
};

exports.setsearch = (req, res) => {
    const regex = new RegExp(req.params.text, 'i')
    Set.find({ name: { $regex: regex } }, (err, sets) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!sets) {
            return res.status(404).send({ message: "No Sets found." });
        }

        var ans = JSON.parse(JSON.stringify(sets));

        for(var item of ans) {
            item.length = item.data?.length;
            item.data = [];
            item.data = undefined;
        }

        res.status(200).send(ans);
    }).limit(parseInt(req.params.max)).select({ 'name': 1, 'userid': 1, 'data': 1 });
};

exports.setall = (req, res) => {
    Set.findById(req.params.id, (err, set) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!set) {
            return res.status(404).send({ message: "Set Not found." });
        }
        res.status(200).send({
            id: set._id,
            name: set.name,
            userid: set.userid,
            length: set.data.length,
            data: set.data,
        });
    });
};

exports.setcreate = (req, res) => {
    const set = new Set({
        name: req.body.name,
        userid: req.userId,
        data: req.body.data,
    });

    set.save((err, set) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "Set created successfully!" });
    });
};

exports.setchange = (req, res) => {
    Set.findById(req.params.id, (err, set) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!set) {
            return res.status(404).send({ message: "Set Not found." });
        }
        if (set.userid != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        Set.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, set) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!set) {
                return res.status(404).send({ message: "Set Not found." });
            }

            res.send({ message: "Set updated successfully!" });
        });
    });
};

exports.setdelete = (req, res) => {
    Set.findById(req.params.id, (err, set) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!set) {
            return res.status(404).send({ message: "Set Not found." });
        }
        if (set.userid != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        Set.findByIdAndRemove(req.params.id, (err, set) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!set) {
                return res.status(404).send({ message: "Set Not found." });
            }
            if (set.userid != req.userId) {
                return res.status(401).send({ message: "Unauthorized!" });
            }

            res.send({ message: "Set deleted successfully!" });
        });
    });
};