const bodyParser = require('body-parser');
let mongoose = require('mongoose');
// User schema 
const userSchema = new mongoose.Schema({
    _id: Number,
    name : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:  true
    },
    email:{
        type: String,
        required: true
    },
    role:{
        
        a:{
            type:Boolean,
            default: false
        },
        m:{
            type:Boolean,
            default: false
        },
        n:{
            type:Boolean,
            default: true
        },
    },

    ou: String,
    
    division:String,  

    creationDate: {
        type: Date,
        immutable: true,
        default: Date.now
    }
})

module.exports = mongoose.model("User",userSchema);

