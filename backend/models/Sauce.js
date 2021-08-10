const mongoose = require('mongoose');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
const validate = require('mongoose-validator');

var nameValidator = [ 
validate({
  validator: 'isLength',
  arguments: [3, 60], 
  message: 'Le nom de votre Sauce doit contenir entre 3 and 60 caractères',
}),
validate({
  validator: 'matches',
  arguments: /^[a-z\d\-_\s]+$/i, 
  message: "Vous ne pouvez utiliser que des chiffres et des lettres pour nommer votre sauce",
}),
];

var manufacturerValidator = [ 
  validate({
    validator: 'isLength',
    arguments: [3, 40], 
    message: 'Le nom du fabricant doit contenir entre 3 et 40 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, 
    message: "Vous ne pouvez utiliser que des chiffres et des lettres pour nommer le fabricant",
  }),
];

var descriptionValidator = [
  validate({
    validator: 'isLength',
    arguments: [10, 150],
    message: 'La description de la sauce doit contenir entre 10 et 150 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i,
    message: "Vous ne pouvez utiliser que des chiffres et des lettres pour la description de la sauce",
  }),
];

var pepperValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 20], 
    message: 'Le principal ingrédient doit contenir entre 3 et 20 caractères',
  }),
  validate({
    validator: 'isAlphanumeric',
    message: "Ne peut contenir que des caractères alphanumériques entre 3 et 20 caractères",
  }),
];

const sauceSchema = mongoose.Schema({
  name: { type: String, required: true, validate: nameValidator},
  manufacturer: { type: String, required: true, validate: manufacturerValidator},
  description: { type: String, required: true, validate: descriptionValidator},
  mainPepper: { type: String, required: true, validate: pepperValidator},
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

sauceSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('Sauce', sauceSchema);