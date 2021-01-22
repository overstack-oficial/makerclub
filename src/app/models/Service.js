const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Service = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }, 
    hashtags: { type: Array, default: [] }, 
    active: { type: Boolean, required: true }, 
    user: { type: Schema.Types.ObjectId, ref: "user", required: true }
},
{
    timestamps: true,
});

Service.plugin(mongoosePaginate);

module.exports = mongoose.model('service', Service);
