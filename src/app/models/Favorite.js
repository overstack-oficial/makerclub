const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Favorite = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  service: { type: Schema.Types.ObjectId, ref: "service", required: true },
  favorite: { type: Boolean, required: true },
},
{
    timestamps: true,
});

Favorite.plugin(mongoosePaginate);

module.exports = mongoose.model('favorite', Favorite);
