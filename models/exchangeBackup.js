const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let exchangeSchema = new Schema({    
email:{type:String},
identity:{type:String},
userId:{type:String},
currency:{type:String},
address:{type:String,unique:true},
privateKey:{type:String},
})

module.exports = mongoose.model('exchange', exchangeSchema);

