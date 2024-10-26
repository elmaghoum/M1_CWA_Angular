# Application de Gestion d'Événements

Ce projet est une application Angular de gestion d’événements, réalisée par des étudiants en Master 1 Informatique dans le cadre du module **Conception Web Avancée (CWA)**. L'application permet aux utilisateurs de consulter les détails des événements et de réserver des places pour divers types d'événements comme des concerts, des représentations théâtrales, des galas musicaux, etc. Elle offre également des fonctionnalités de filtrage, de tri et de gestion des événements pour un usage optimal.

## Fonctionnalités Principales

1. **Authentification des Utilisateurs**
2. **Gestion des Événements** (CRUD complet pour les administrateurs)
3. **Recherche et Tri Avancés**
4. **Barre de Recherche** utilisable par tous les utilisateurs
5. **Interactions Utilisateurs** (Abonnement à la newsletter, Consultation des informations détaillées sur les événements)
6. **Gestion des Réservations** pour les utilisateurs

Chaque fonctionnalité a été développée dans le souci de fournir une interface fluide et conviviale tout en garantissant la sécurité des données et la performance de l'application.

## Considérations Techniques

Nous avons pris en compte les aspects suivants lors du développement :
- **Maintenance et Scalabilité** pour assurer la croissance de l'application.
- **Tests et Qualité du Code** pour garantir sa robustesse.
- **Performance Optimisée** pour une expérience utilisateur sans interruptions.

## Technologies Utilisées

Le projet a été développé avec les technologies suivantes :
- **Angular** pour le front-end
- **Node.js** pour le back-end
- **HTML5** et **CSS3** pour le design
- **TypeScript** pour la logique métier
- **MongoDB** pour la gestion de la base de données

## Installation et Configuration

Suivez les étapes ci-dessous pour installer et configurer l'application Angular ainsi que le serveur Node.js.

### 1. Installation et Configuration d’Angular

1. **Installer Angular CLI**
   - Ouvrez un terminal et tapez la commande suivante pour installer Angular CLI globalement :
     ```bash
     npm install -g @angular/cli
     ```
2. **Vérifier l'installation d'Angular CLI**
   - Pour vous assurer qu'Angular CLI est installé correctement, exécutez la commande :
     ```bash
     ng version
     ```
3. **Installer les dépendances de l'application**
   - Naviguez dans le répertoire de votre application Angular et exécutez :
     ```bash
     npm install
     ```

### 2. Installation et Configuration du Serveur Node.js

1. **Télécharger Node.js**
   - Rendez-vous sur [le site officiel de Node.js](https://nodejs.org/) pour télécharger et installer Node.js.
2. **Vérifier l'installation de Node.js et npm**
   - Après l'installation, ouvrez un terminal et tapez :
     ```bash
     node -v
     npm -v
     ```
3. **Installer les dépendances du serveur**
   - Naviguez vers le répertoire du serveur Node.js et exécutez :
     ```bash
     npm install
     ```

### 3. Initialisation de la Base de Données

1. **Télécharger MongoDB Compass**
   - Téléchargez MongoDB Compass à partir du [site officiel de MongoDB Compass](https://www.mongodb.com/products/compass).
2. **Lancer MongoDB Compass**
   - Suivez les instructions d'installation, puis lancez l'application et connectez-vous à votre base de données.
   - Importer les fichiers de BD "bdd.json" et bdd_1.json

### 4. Installation des Modules Complémentaires

1. **Installer Multer**
   - Pour manipuler des fichiers et images, installez le module Multer avec la commande :
     ```bash
     npm install multer
     ```

### 5. Compilation de l'Application Angular

1. **Compiler le projet Angular**
   - Retournez dans le répertoire de votre application Angular et exécutez :
     ```bash
     ng build
     ```

### 6. Exécution des Serveurs

1. **Ouvrir deux terminaux**
   - Dans le premier terminal, naviguez vers le répertoire du serveur Node.js (`../src/server`) et lancez le serveur :
     ```bash
     nodemon app.js
     ```
     ou
     ```bash
     node app
     ```
   - Dans le second terminal, naviguez vers le répertoire de l'application Angular et démarrez le serveur de développement :
     ```bash
     ng serve
     ```

### 7. Accès à l'Application

1. **Ouvrir l'application dans un navigateur**
   - Accédez à l'URL fournie par le serveur Angular, généralement `http://localhost:4200`.
2. **Se connecter à l'application**
   - Vous pouvez vous connecter en tant qu'**administrateur** ou **utilisateur** avec les identifiants suivants :
     - **Adresse e-mail** : `admin` (ou `user`)
     - **Mot de passe** : `admin` (ou `user`)


## Auteurs

Ce projet a été réalisé par les étudiants en Master 1 Informatique (promotion 2023/2024):
- EL MAGHOUM Fayçal
- AMZAL Idir
- TAHIR Ilyas
---

‎-Décembre ‎2023
