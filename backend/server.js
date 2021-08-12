// Ecoute des requetes http et reponse
const http = require("http");
const app = require("./app");

// La fonction normalizePort renvoie un port valide
const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};
// Si aucun port n'est fourni on écoutera sur le port 3000
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// la fonction errorHandler recherche les différentes erreurs et les gère de manière appropriée
const errorHandler = (error) => {
	if (error.syscall !== "listen") {
		throw error;
	}
	const address = server.address();
	const bind =
		typeof address === "string" ? "pipe " + address : "port: " + port;
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges.");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use.");
			process.exit(1);
			break;
		default:
			throw error;
	}
};

const server = http.createServer(app);

// gestions des évenements serveur pour un retour console
// Lance le serveur et affiche sur quel port se connecter ou gère les erreurs s'il y en a
server.on("error", errorHandler);
server.on("listening", () => {
	const address = server.address();
	const bind = typeof address === "string" ? "pipe " + address : "port " + port;
	console.log("Listening on " + bind);
});

// Le serveur écoute le port définit plus haut
server.listen(port);
