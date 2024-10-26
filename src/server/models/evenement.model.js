// Import du module mongoose pour la gestion des schémas de données MongoDB
const mongoose = require('mongoose');

// Définition du schéma de données pour le modèle d'événement
const eventSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  nom: {
    type: String,
    required: true,
  },
  dateEcheance: {
    type: String,
    required: true,
  },
  priorite: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    required: false,
    default: "en cours",
  },
  commentaire: {
    type: String,
    required: false,
  },
  prixBillets: {
    type: Number,
    required: true,
  },
  genreEvenement: {
    type: String,
    required: true,
  },
  artistes: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    required: false,
  },
  termine: {
    type: Boolean,
    default: false,
  },
});

// Création du modèle 'Event' basé sur le schéma défini, associé à la collection 'events' dans la base de données
let Event = mongoose.model('Event', eventSchema, 'events');

// Export du modèle pour l'utiliser dans d'autres fichiers
module.exports = Event;
