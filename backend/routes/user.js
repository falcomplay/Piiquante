const express = require("express");
const router = express.Router();

// On associe les fonctions aux différentes routes, on importe le controller
const userCtrl = require("../controllers/user");
const verifyPassword = require("../middleware/verifyPassword");

// Chiffre le mot de passe de l'utilisateur, ajoute l'utilisateur à la base de données
router.post("/signup", verifyPassword, userCtrl.signup); // Crée un nouvel utilisateur
// Vérifie les informations d'identification de l'utilisateur, enrenvoyant l'identifiant userID depuis la base de données et un TokenWeb JSON signé(contenant également l'identifiant userID)
router.post("/login", userCtrl.login); // Connecte un utilisateur

module.exports = router;
