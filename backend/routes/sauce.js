const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth"); // Récupère la configuration d'authentification JsonWebToken
const multer = require("../middleware/multer-config"); //On importe le middleware multer pour la gestion des images

// On associe les fonctions aux différentes routes, on importe le controller
const sauceCtrl = require("../controllers/sauce");

// Route qui permet de créer "une sauce"
router.post("/", auth, multer, sauceCtrl.createSauce);
// Route qui permet de modifier "une sauce"
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
// Route qui permet de supprimer "une sauce"
router.delete("/:id", auth, sauceCtrl.deleteSauce);
// Renvoie la sauce avec l'ID fourni
router.get("/:id", auth, sauceCtrl.getOneSauce);
// Route qui permet de récupérer toutes les sauces
router.get("/", auth, sauceCtrl.getAllSauces);
// Route qui permet de gérer les likes des sauces
router.post("/:id/like", auth, sauceCtrl.likeDislike);

module.exports = router;
