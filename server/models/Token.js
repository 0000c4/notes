const {Schema, model , ObjectId} = require('mongoose');

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: [{type: String}],
})

module.exports = model('Token', Token);
