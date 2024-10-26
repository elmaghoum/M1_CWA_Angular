// Import du module mongoose pour la gestion de la base de données MongoDB
const mongoose = require('mongoose');

// Connexion à la base de données MongoDB située à l'adresse 'mongodb://127.0.0.1:27017/bdd'
// 27017 correspont au numero du port, il peut etre modifier en fonction de la configuration
mongoose.connect('mongodb://127.0.0.1:27017/bdd');

// Récupération de la connexion MongoDB
const db = mongoose.connection;

// Gestionnaire d'événement en cas d'erreur de connexion à la base de données
db.on('error', console.error.bind(console, 'Erreur de connexion :'));

// Gestionnaire d'événement une fois la connexion établie avec succès
db.once('open', () => {
  console.log('Connecté à la base de données'); // Affichage d'un message indiquant la connexion réussie
});
