const bodyParser = require('body-parser');
let mongoose = require('mongoose');
// Repo schema 
const repoSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    url: String,
    username: String,
    password: String,
    ou:String,
    division: String,
    creationDate: {
        type: Date,
        immutable: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Repo",repoSchema);