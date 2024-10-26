// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes/evenement.routes'); // Import des routes liées aux événements
const db = require('../config/database'); // Import du fichier de configuration de la base de données

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs'); // Configuration du moteur de vue EJS

// Middleware CORS pour gérer les requêtes cross-origin
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes statiques pour les fichiers du dossier 'app' et 'node_modules'
app.use(express.static('app'));
app.use(express.static('node_modules'));

// Route de base pour vérifier le fonctionnement du serveur
app.get('/', (req, res) => {
  res.send("Le serveur fonctionne depuis le web");
});

// Utilisation des routes "/events" pour gérer les événements
const events = require('./routes/evenement.routes');
app.use('/events', events);

// Utilisation des routes "/users" pour gérer les utilisateurs
const users = require('./routes/utilisateur.routes');
app.use('/users', users);

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Démarrage du serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
