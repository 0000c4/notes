const {Schema, model , ObjectId} = require('mongoose');

const Note = new Schema({
    title: {type: String},
    body: {type: String},
    user: {type: ObjectId, ref: 'User'},
    images: [{type: String}]
})

module.exports = model('Note', Note);
