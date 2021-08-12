const multer = require("multer"); // On importe multer qui est un package qui permet de gérer les fichiers entrants dans les requêtes HTTP

//Transformation des extentions pour définir le format des images
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
};

// On crée un objet de configuration pour préciser à multer où enregistrer les fichiers images et les renommer
const storage = multer.diskStorage({
	// On mets la destination d'enregistrement des images
	destination: (req, file, callback) => {
		callback(null, "images");
	},
	// On dit à multer quel nom de fichier on utilise pour éviter les doublons
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const extension = MIME_TYPES[file.mimetype];
		callback(null, name + Date.now() + "." + extension); // Genère le nom complet du fichier- Nom d'origine + numero unique + . + extension
	},
});

module.exports = multer({ storage: storage }).single("image");
