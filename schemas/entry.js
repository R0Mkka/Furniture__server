const mongoose = require('mongoose');
const { Schema } = mongoose;

const EntrySchema = new Schema(
  {
    id: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
  },
  { 
    versionKey: false,
    timestamps: false, 
  },
);

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
