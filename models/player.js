const mongoose = require ('mongoose')

const playerSchema = new mongoose.Schema({
name:{
    type: String, 
    required: true
},
club:{
    type: String, 
    required: true
},
position:{
    type: String, 
    required: true
},
nationality:{
    type: String, 
    required: true
},
age:{
    type: Number, 
    required: true
} 
}) 

module.exports = mongoose.model('Player', playerSchema)





