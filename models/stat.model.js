const mongoose = require("mongoose");

const Stat = mongoose.model(
    "Stat",
    new mongoose.Schema({
        setid: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: true,
        },
        data: [
            {
                cardid: {
                    type: String,
                },
                stared: Boolean,
                stat: [
                    {
                        type: {
                            type: String,
                        },
                        date: {
                            type: Date,
                        },
                    }
                ]
            }
        ]
    })
);

module.exports = Stat;