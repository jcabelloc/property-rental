var mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
    price: Number,
    url: String,
    address: String,
    description: String,
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ]
});

module.exports = mongoose.model("Property", propertySchema);