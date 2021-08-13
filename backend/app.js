// App.js fait appel aux différentes fonctions implémentées dans l'APi : Accès aux images, aux route User, aux route Sauce

// import des modules npm - Ajout des plugins externes
const express = require("express"); // Importation d'express => Framework basé sur node.js
const bodyParser = require("body-parser"); // Permet d'extraire l'objet JSON des requêtes POST
const mongoose = require("mongoose"); // Plugin Mongoose pour se connecter à la data base Mongo Db
const path = require("path"); // Plugin qui sert dans l'upload des images et permet de travailler avec les répertoires et chemin de fichier

// utilisation du module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités
// il sécurise nos requêtes HTTP, sécurise les en-têtes, contrôle la prélecture DNS du navigateur, empêche le détournement de clics
// et ajoute une protection XSS mineure et protège contre le reniflement de TYPE MIME
// cross-site scripting, sniffing et clickjacking
const helmet = require("helmet");
const session = require("cookie-session");
const nocache = require("nocache");
require("dotenv").config();

// Déclaration des routes
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

// Connection à la base de données MongoDB  -- Possibilitè d'utilisé une variable d'environnement pour plus de sécurité
mongoose
	.connect(process.env.MONGOOSE_CONNECT.toString(), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connexion à MongoDB réussie !"))
	.catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use((req, res, next) => {
	// on indique que les ressources peuvent être partagées depuis n'importe quelle origine
	res.setHeader("Access-Control-Allow-Origin", "*");
	// on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	// on indique les méthodes autorisées pour les requêtes HTTP
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	// on autorise ce serveur à fournir des scripts pour la page visitée
	res.setHeader("Content-Security-Policy", "default-src 'self'");
	next();
});

// Options pour sécuriser les cookies
const expiryDate = new Date(Date.now() + 3600000); // 1 heure (60 * 60 * 1000)
app.use(
	session({
		name: "session",
		secret: process.env.SEC_SES,
		keys: ["key1", "key2"],
		cookie: {
			secure: true,
			httpOnly: true,
			domain: "http://localhost:3000",
			expires: expiryDate,
		},
	})
);

// Middleware qui permet de parser les requêtes envoyées par le client, on peut y accéder grâce à req.body
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

// Transforme les données arrivant de la requête POST en un objet JSON facilement exploitable
app.use(bodyParser.json());

// On utilise helmet pour plusieurs raisons notamment la mise en place du X-XSS-Protection afin d'activer le filtre de script intersites(XSS) dans les navigateurs web
app.use(helmet());

//Désactive la mise en cache du navigateur
app.use(nocache());

// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
