// Import des modules requis
const express = require('express');
const router = express.Router();
const Event = require('../models/evenement.model'); // Import du modèle d'événement
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configuration du stockage des images avec Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../src/assets/images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png'); // Assurez-vous que les images sont enregistrées en tant que fichiers PNG
  },
});

const upload = multer({ storage: storage });

// Route GET pour récupérer tous les événements
router.get('/', async (req, res) => {
  try {
    // Récupérer tous les événements depuis la base de données
    const evenements = await Event.find();

    // Renvoyer les événements au format JSON
    res.json(evenements);
  } catch (error) {
    // Gérer les erreurs, par exemple renvoyer une réponse d'erreur avec le code 500 (Internal Server Error)
    console.error('Erreur lors de la récupération des événements :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
  }
});

// Exemple de route pour récupérer toutes les images
router.get('/get-all-images', (req, res) => {
  const fs = require('fs');
  const imageDir = path.join(__dirname, '../../assets/images');

  // Lis le contenu du répertoire d'images
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error('Erreur lors de la lecture du répertoire des images :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des images' });
    } else {
      // Renvoie la liste des noms de fichiers d'images
      res.json({ images: files });
    }
  });
});

// Route GET pour récupérer le nom d'une image individuelle
router.get('/get-all-images/:filename', (req, res) => {
  const filename = req.params.filename;

  // Renvoie le nom du fichier
  res.json({ filename: filename });
});

// Route POST pour créer un nouvel événement
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Vérifier si req.file est défini
    if (!req.file) {
      console.error('Aucun fichier image téléchargé');
      return res.status(400).json({ error: 'Aucun fichier image téléchargé' });
    }

    // Récupérer les données de la requête POST
    const { nom, genreEvenement, dateEcheance, prixBillets, priorite, commentaire } = req.body;

    // Récupérer le nom du fichier image à partir de la requête
    const filename = req.file.filename;

    // Créer un nouvel événement avec les données reçues
    const nouvelEvenement = new Event({
      nom,
      genreEvenement,
      dateEcheance,
      prixBillets,
      priorite,
      commentaire,
      image: filename, // Ajouter le nom du fichier image
    });

    // Sauvegarder le nouvel événement dans la base de données
    const evenementCree = await nouvelEvenement.save();

    // Renvoyer la réponse avec le nouvel événement créé et le nom du fichier image
    res.status(201).json({ evenement: evenementCree, filename: filename });
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l\'événement' });
  }
});

// Route GET pour la recherche d'événements
router.get('/recherche', async (req, res) => {
  try {
    const termeRecherche = req.query.terme;

    // Vérifiez si le terme de recherche est vide
    if (!termeRecherche) {
      return res.status(400).json({ error: 'Terme de recherche vide' });
    }

    // Recherchez les événements en fonction du terme de recherche, sans conversion en ObjectId
    const resultatsRecherche = await Event.find({
      $or: [
        { nom: { $regex: new RegExp(termeRecherche, 'i') } },
        { commentaire: { $regex: new RegExp(termeRecherche, 'i') } },
        // Ajoutez d'autres propriétés si nécessaire
      ],
    });

    res.json(resultatsRecherche);
  } catch (error) {
    console.error('Erreur lors de la recherche d\'événements :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche d\'événements' });
  }
});

// Route GET récupérer les informations d'un événement
router.get('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    // Vérifie si l'identifiant est une chaîne vide avant de faire la requête
    if (!eventId) {
      return res.status(400).json({ error: 'Identifiant non valide' });
    }

    // Transforme l'ObjectId en chaîne de caractères
    const eventIdAsString = eventId.toString();

    const evenement = await Event.findById(eventIdAsString);

    if (!evenement) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }

    res.json(evenement);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'événement' });
  }
});

// Route PUT pour modifier un événement
router.put('/:id', async (req, res) => {
  try {
    // Récupérer l'ID de l'événement à modifier
    const eventId = req.params.id;

    // Récupérer les données de la requête PUT
    const { nom, genreEvenement, dateEcheance, prixBillets, priorite, commentaire, image } = req.body;

    // Rechercher l'événement dans la base de données par son ID
    const evenementAModifier = await Event.findById(eventId);

    if (!evenementAModifier) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }

    // Mettre à jour les propriétés de l'événement avec les nouvelles données
    evenementAModifier.nom = nom;
    evenementAModifier.genreEvenement = genreEvenement;
    evenementAModifier.dateEcheance = dateEcheance;
    evenementAModifier.prixBillets = prixBillets;
    evenementAModifier.priorite = priorite;
    evenementAModifier.commentaire = commentaire;
    evenementAModifier.image = image;

    // Sauvegarder l'événement modifié dans la base de données
    const evenementModifie = await evenementAModifier.save();

    // Renvoyer la réponse avec l'événement modifié
    res.status(200).json(evenementModifie);
  } catch (error) {
    console.error('Erreur lors de la modification de l\'événement :', error);
    res.status(500).json({ error: 'Erreur lors de la modification de l\'événement' });
  }
});

// Route DELETE pour supprimer un événement
router.delete('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    // Vérifie si l'identifiant est une chaîne vide avant de faire la requête
    if (!eventId) {
      return res.status(400).json({ error: 'Identifiant non valide' });
    }

    // Transforme l'ObjectId en chaîne de caractères
    const eventIdAsString = eventId.toString();

    // Utiliser la méthode deleteOne pour supprimer l'événement de la base de données
    const result = await Event.deleteOne({ _id: eventIdAsString });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Événement non trouvé' });
    }

    res.status(200).json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement' });
  }
});

// Export du module de route
module.exports = router;
