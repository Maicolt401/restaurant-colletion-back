const { Schema, model } = require("mongoose");

const ReservesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
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

  imageBackup: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    default: "",
  },
});

const Reserve = model("Reserve", ReservesSchema, "reserves");

module.exports = Reserve;
