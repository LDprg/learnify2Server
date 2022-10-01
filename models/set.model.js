const mongoose = require("mongoose");

const Set = mongoose.model(
    "Set",
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: true,
        },
        data: [
            {
                first: {
                    type: String,
                },
                second: {
                    type: String,
                },
            }
        ]
    })
);

module.exports = Set;