const mongoose = require('mongoose');

const phoneShema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      validate: {
        validator: v => /^\+?\d{10,15}$/.test(v),
        message: props => `${props.value} is not a valid phone number`,
      },
    },
    type: {
      type: String,
      enum: {
        values: ['mobile', 'home', 'work'],
        message: '{VALUE} is not a valid phone type',
      },
      default: 'mobile'
    },
    owner: {
      type: mongoose.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Phone = mongoose.model('Phone', phoneShema);
module.exports = Phone;
