const { Schema, model } = require("mongoose");

const userSchema = new Schema ({


  restaurantName:{
    type: String
  },
  CIF:{
    type: String
  },
  username:{
    type: String,
    required:true,
    unique:true,
  },
  password:{
    type: String,
    required:true
  }
})

const User = model("User", userSchema,"users");

module.exports=User;
