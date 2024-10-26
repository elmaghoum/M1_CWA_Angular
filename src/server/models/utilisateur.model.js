// Import du module mongoose pour la gestion des schémas de données MongoDB
const mongoose = require('mongoose');

// Définition du schéma de données pour le modèle d'utilisateur
const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    motDePasse: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    dateInscription: {
        type: Date,
        default: Date.now,
    },
    reservation: [{
        type: String,
    }],
});

// Création du modèle 'Utilisateur' basé sur le schéma défini, associé à la collection 'users' dans la base de données
let Utilisateur = mongoose.model('Utilisateur', utilisateurSchema, 'users');

// Export du modèle pour l'utiliser dans d'autres fichiers
module.exports = Utilisateur;
