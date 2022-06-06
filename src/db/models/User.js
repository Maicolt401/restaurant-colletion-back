const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema({
  restaurantName: {
    type: String,
  },
  CIF: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reserves: {
    type: [{ type: SchemaTypes.ObjectId, ref: "reserves" }],
    default: [],
  },
});

const User = model("User", userSchema, "users");

module.exports = User;
