const mongoose = require('mongoose');
const { Schema } = mongoose;

const FeedbackSchema = new Schema(
  {
    id: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
      type: String,
      required: true,
    },
    feedbackText: {
        type: String,
        required: true,
        minlength: 10,
    },
    isPublished: {
        type: Boolean,
        required: false,
        default: false,
    },
    addedAt: {
        type: Date,
        required: true,
    },
  },
  { 
    versionKey: false,
    timestamps: false, 
  },
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = Feedback;
