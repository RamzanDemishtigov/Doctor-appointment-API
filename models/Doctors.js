const mongoose = require("mongoose")

const schema = mongoose.Schema({
	name: String,
    spec: String,
    slots: [{
        condition: {type:Boolean,default: false,require: false},
        time: String,   
        user: {type:String,default: "",require: false},
    }],
})

module.exports = mongoose.model("Doctors", schema)