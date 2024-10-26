// utilisateur.routes.js
const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/utilisateur.model'); // Import du modèle d'utilisateur

// Définir une route GET pour récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    // Récupérer tous les utilisateurs depuis la base de données
    const utilisateurs = await Utilisateur.find();

    // Renvoyer les utilisateurs au format JSON
    res.json(utilisateurs);
  } catch (error) {
    // Gérer les erreurs, par exemple renvoyer une réponse d'erreur avec le code 500 (Internal Server Error)
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
  }
});

// Route GET pour récupérer un utilisateur par son ID
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const utilisateur = await Utilisateur.findById(userId);

    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(utilisateur);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
  }
});

// Route POST pour l'inscription de l'utilisateur
router.post('/', async (req, res) => {
  try {
    const { nom, prenom, email, motDePasse } = req.body;

    // Vérifier si le rôle est fourni dans le corps de la requête
    const role = req.body.role || 'user';

    // Créer un nouvel utilisateur en fonction du rôle
    let nouvelUtilisateur = new Utilisateur({ nom, prenom, email, motDePasse, role });

    const utilisateurCree = await nouvelUtilisateur.save();
    res.status(201).json(utilisateurCree);
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
  }
});

// Route POST pour la connexion de l'utilisateur
router.post('/:id', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const utilisateur = await Utilisateur.findOne({ email, motDePasse });

    if (utilisateur) {
      // Connexion réussie
      const role = utilisateur.role; // Récupérer le rôle de l'utilisateur
      res.status(200).json({ message: 'Connexion réussie', role, utilisateur });
    } else {
      // Identifiants invalides
      res.status(401).json({ error: 'Identifiants invalides' });
    }
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la connexion de l\'utilisateur' });
  }
});

// Route POST pour ajouter une réservation à l'utilisateur
router.post('/:id/reservation', async (req, res) => {
  const userId = req.params.id;
  const reservationId = req.body.reservationId;

  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      userId,
      { $addToSet: { reservation: reservationId } }, // Utilise $addToSet pour éviter les doublons
      { new: true }
    );

    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Réservation ajoutée avec succès', utilisateur });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la réservation à l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la réservation à l\'utilisateur' });
  }
});

// Route GET pour récupérer les réservations d'un utilisateur
router.get('/:id/reservation', async (req, res) => {
  const userId = req.params.id;

  try {
    const utilisateur = await Utilisateur.findById(userId);

    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const reservations = utilisateur.reservation;
    res.status(200).json({ reservations });
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations de l\'utilisateur' });
  }
});

// Route pour remplacer totalement le tableau de réservations d'un utilisateur
router.put('/:id/reservation', async (req, res) => {
  const userId = req.params.id;
  const nouvelleListeReservation = req.body.nouvelleListeReservation;

  try {
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      userId,
      { $set: { reservation: nouvelleListeReservation } },
      { new: true }
    );

    if (!utilisateur) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ message: 'Liste de réservations mise à jour avec succès', utilisateur });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la liste de réservations de l\'utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la liste de réservations de l\'utilisateur' });
  }
});

// Export du module de route
module.exports = router;
