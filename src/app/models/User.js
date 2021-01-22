const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const User = new mongoose.Schema({
    name: { type: String, required: true  },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
},
{
    timestamps: true,
});

User.plugin(mongoosePaginate);

module.exports = mongoose.model('user', User);