
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isEmail, isStrongPassword } = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "L'adresse mail est requise"],
      validate: [isEmail, "Veuillez entrer une adresse mail valide"],
    },
    pseudo: {
      type: String,
      required: [true, "Le pseudo est requis"],
      minLength: [5, "Le pseudo doit contenir minimum 5 caractères"],
      maxLength: [20, "Le pseudo doit contenir maximum 20 caractères"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      validate: [
        isStrongPassword,
        "Le mot de passe doit contenir au minimum 8 caractères, une lettre minuscule, une lettre majuscule, et un caractère spécial",
      ],
    },
    authTokens: [{
      authToken: {
        type: String,
        required: true
      }
    }]
  },
  {
    timestamps: true,
  }
);

/**
 * password hash
 */
userSchema.pre('save', function (next) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
})

userSchema.method('generateAuthTokenAndSaveUser', async function () {
  var authToken = jwt.sign({_id: this._id.toString()}, process.env.TOKEN_SECRET);
  this.authTokens.push({authToken});
  await this.save();
  return authToken;
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;