const jwt = require("jsonwebtoken"); // On récupère le package jsonwebtoken

module.exports = (req, res, next) => {
	try {
		// On récupère le token dans le header de la requête autorisation
		const token = req.headers.authorization.split(" ")[1];
		// On vérifie le token décodé avec la clé secrète initiéé avec la création du token encodé initialement, les clés doivent correspondre
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		// On vérifie que le userId envoyé avec la requête correspond au userId encodé dans le token
		const userId = decodedToken.userId;
		if (req.body.userId && req.body.userId !== userId) {
			throw "User ID non valable !";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Requête non authentifiée !"),
		});
	}
};
