const { Schema, model } = require("mongoose");

const ReservesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
  },
  numPersons: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  dni: {
    type: String,
  },

  image: {
    type: String,
    default: "",
  },
});

const Reserve = model("Check", ReservesSchema, "checks");

module.exports = Reserve;
