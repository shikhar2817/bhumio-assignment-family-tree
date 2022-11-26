const mongoose = require("mongoose");

const familySchema = new mongoose.Schema({
    data: String,
    id: Number,
});

module.exports = mongoose.model("Family", familySchema);
