const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
    correctAnswers: { type: Number, default: 0 },
    incorrectAnswers: { type: Number, default: 0 }
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;