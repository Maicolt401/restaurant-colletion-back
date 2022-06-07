const { Schema, model } = require("mongoose");

const ReservesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
  },
  numberPersons: {
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

const Reserve = model("Reserve", ReservesSchema, "reserves");

module.exports = Reserve;
