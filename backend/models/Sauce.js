const mongoose = require("mongoose");
const sanitizerPlugin = require("mongoose-sanitizer-plugin");
const validate = require("mongoose-validator");

// Création de contraintes regex pour resteindre les champs renseignès et assurés une couche de protection
// Aurait pu être dans le middleware pour plus de clarté (bug à l'appel du middleware)
var nameValidator = [
	validate({
		validator: "isLength",
		arguments: [3, 60],
		message: "Le nom de votre Sauce doit contenir entre 3 and 60 caractères",
	}),
	validate({
		validator: "matches",
		arguments: /^[a-z\d\-_\s]+$/i,
		message:
			"Vous ne pouvez utiliser que des chiffres et des lettres pour nommer votre sauce",
	}),
];

var manufacturerValidator = [
	validate({
		validator: "isLength",
		arguments: [3, 40],
		message: "Le nom du fabricant doit contenir entre 3 et 40 caractères",
	}),
	validate({
		validator: "matches",
		arguments: /^[a-z\d\-_\s]+$/i,
		message:
			"Vous ne pouvez utiliser que des chiffres et des lettres pour nommer le fabricant",
	}),
];

var descriptionValidator = [
	validate({
		validator: "isLength",
		arguments: [10, 250],
		message:
			"La description de la sauce doit contenir entre 10 et 150 caractères",
	}),
	validate({
		validator: "matches",
		arguments: /^[a-z\d\-_\s]+$/i,
		message:
			"Vous ne pouvez utiliser que des chiffres et des lettres pour la description de la sauce",
	}),
];

var pepperValidator = [
	validate({
		validator: "isLength",
		arguments: [3, 20],
		message: "Le principal ingrédient doit contenir entre 3 et 20 caractères",
	}),
	validate({
		validator: "isAlphanumeric",
		message:
			"Ne peut contenir que des caractères alphanumériques entre 3 et 20 caractères",
	}),
];

// Création d'un schema mangoose pour que les données de la base MongoDB ne puissent pas différer de
//celui précisé dans le schema Model des sauces. L'id est généré automatiquement par MongoDB

const sauceSchema = mongoose.Schema({
	name: { type: String, required: true, validate: nameValidator },
	manufacturer: {
		type: String,
		required: true,
		validate: manufacturerValidator,
	},
	description: { type: String, required: true, validate: descriptionValidator },
	mainPepper: { type: String, required: true, validate: pepperValidator },
	imageUrl: { type: String, required: true },
	userId: { type: String, required: true },
	heat: { type: Number, required: true },
	likes: { type: Number },
	dislikes: { type: Number },
	usersLiked: { type: [String] },
	usersDisliked: { type: [String] },
});

sauceSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model("Sauce", sauceSchema);
