const db = require("../models");
const User = db.user;
const Set = db.set;
const Stat = db.stat;

function fixStared(setid, stat) {
    var ans = JSON.parse(JSON.stringify(stat));

    Set.findById(setid, (err, set) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!set) {
            return res.status(404).send({ message: "Set Not found." });
        }

        for (var item of ans.data) {
            var found = false;

            for (var card of set.data) {
                if (card._id == item.cardid) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                item.stared = undefined;
                Stat.findByIdAndUpdate(stat._id, { data: ans.data }, { new: true }, (err, stat) => {
                    if (err) {
                        return res.status(500).send({ message: err });
                    }
                });
            }
        }
    });
}

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

exports.getuserstat = (req, res) => {
    Stat.findOne({ setid: req.params.id, userid: req.userId }, (err, stat) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!stat) {
            return res.status(404).send({ message: "Stat Not found." });
        }
        if (stat.userid != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        fixStared(req.params.id, stat);

        res.status(200).send(stat);
    });
}

exports.getuserstatshort = (req, res) => {
    Stat.findOne({ setid: req.params.id, userid: req.userId }, (err, stat) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!stat) {
            return res.status(404).send({ message: "Stat Not found." });
        }
        if (stat.userid != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        fixStared(req.params.id, stat);

        var ans = JSON.parse(JSON.stringify(stat));

        for (var item of ans.data) {
            var data = new Map();
            for (var stats of item.stat) {
                stats.date = undefined;
                data[stats.type] = data[stats.type] ? data[stats.type] + 1 : 1;
            }
            item.stat = data;
        }
        res.status(200).send(ans);
    });
}

exports.setuserstatcard = (req, res) => {
    Stat.findOne({ setid: req.params.id, userid: req.userId }, (err, stat) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!stat) {
            const stat = new Stat({
                setid: req.params.id,
                userid: req.userId
            });

            stat.save((err, stat) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                this.setuserstatcard(req, res);
            });
            return;
        }

        if (stat.userid != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        var found = false;

        for (var item of stat.data) {
            if (item.cardid == req.params.card) {
                item.stat.push({ type: req.body.type, date: Date.now() });
                found = true;
                break;
            }
        }

        if (!found) {
            stat.data.push({ cardid: req.params.card, stat: [{ type: req.body.type, date: Date.now() }] });
        }

        Stat.findByIdAndUpdate(stat._id, { data: stat.data }, { new: true }, (err, stat) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            if (!stat) {
                return res.status(404).send({ message: "Set Not found." });
            }

            res.send({ message: "Set updated successfully!" });
        });
    });
}

exports.setuserstatcardstared = (req, res) => {
    Stat.findOne({ setid: req.params.id, userid: req.userId }, (err, stat) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!stat) {
            const stat = new Stat({
                setid: req.params.id,
                userid: req.userId
            });

            stat.save((err, stat) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                this.setuserstatcardstared(req, res);
            });
            return;
        }

        if (stat.userid != req.userId) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        var found = false;

        for (var item of stat.data) {
            if (item.cardid == req.params.card) {
                item.stared = req.body.stared;
                found = true;
                break;
            }
        }

        if (!found) {
            stat.data.push({ cardid: req.params.card, stared: req.body.stared });
        }

        Stat.findByIdAndUpdate(stat._id, { data: stat.data }, { new: true }, (err, stat) => {
            if (err) {
                return res.status(500).send({ message: err });
            }
            if (!stat) {
                return res.status(404).send({ message: "Set Not found." });
            }

            res.send({ message: "Set updated successfully!" });
        });
    });
}
