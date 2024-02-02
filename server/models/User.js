const {Schema, model , ObjectId} = require('mongoose');

const User = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    password: {type: String, required: true},
    notes: [{type: ObjectId, ref: 'Note'}],
})

module.exports = model('User', User);
