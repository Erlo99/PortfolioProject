var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    image: String,
    title: String,
    desc: String,
    date: Date,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});

module.exports = mongoose.model("Blog", blogSchema);