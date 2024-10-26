// Import des modules Angular nécessaires
import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../../services/evenement/evenement.service';
import { AuthService } from "../../../services/authentification/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../../services/utilisateur/user.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  // Déclaration des variables membres
  termeRecherche: string = '';
  evenements: any[] = [];
  tousLesEvenements: any[] = [];
  critereTri: string = 'nom';

  userId: string = '';
  userName: string = '';
  utilisateur: any;
  isLoggedIn = false;

  // Constructeur de la classe, injection des services nécessaires
  constructor(
    private evenementService: EvenementService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    // Abonnement au changement du statut de connexion
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  // Méthode du cycle de vie Angular, appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupération des événements depuis le service EvenementService
    this.evenementService.getEvenements().subscribe(
      data => {
        console.log('Réponse du serveur :', data);
        this.evenements = data;
        this.tousLesEvenements = data;
        this.trierEvenements(); // Initialiser le tri
      },
      error => {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    );

    // Abonnement aux changements de l'ID utilisateur
    this.authService.getUserId().subscribe(userId => {
      // Utiliser l'ID utilisateur selon les besoins
      this.userId = userId;
    });

    // Abonnement aux changements du nom d'utilisateur
    this.userService.getUserName().subscribe(userName => {
      // Utiliser le nom d'utilisateur selon les besoins
      this.userName = userName;
      // Appeler d'autres méthodes dépendant de l'ID utilisateur
    });

    // Récupérer le statut de connexion depuis le service AuthService
    const isLoggedIn = this.authService.getLoggedInStatus();

    // Mettre à jour le statut de connexion dans le service AuthService
    this.authService.setLoggedInStatus(isLoggedIn);
  }

  // Vérifier si l'utilisateur a le rôle 'user'
  isUser(): boolean {
    return this.authService.getUserRole() === 'user';
  }

  // Vérifier si l'utilisateur a le rôle 'admin'
  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  // Méthode appelée lors du clic sur le bouton de recherche
  onSave() {
    if (!this.termeRecherche.trim()) {
      // Réinitialiser la liste des événements après une recherche vide
      this.evenements = [...this.tousLesEvenements];
      this.trierEvenements(); // Retri après la recherche
      return;
    }

    // Convertir le terme de recherche en minuscules
    const termeRechercheLower = this.termeRecherche.toLowerCase();

    // Effectuer la recherche d'événements avec le service EvenementService
    this.evenementService.rechercherEvenements(termeRechercheLower).subscribe(
      data => {
        this.evenements = data;
        this.trierEvenements(); // Retri après la recherche
      },
      error => {
        console.error('Erreur lors de la recherche des événements :', error);
      }
    );
  }

  // Méthode appelée lors du changement du critère de tri
  onTriChange() {
    this.trierEvenements();
  }

  // Méthode de tri des événements en fonction du critère choisi
  trierEvenements() {
    switch (this.critereTri) {
      case 'nom':
        this.evenements.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'date':
        this.evenements.sort((a, b) => new Date(a.dateEcheance).getTime() - new Date(b.dateEcheance).getTime());
        break;
      case 'prix':
        this.evenements.sort((a, b) => a.prixBillets - b.prixBillets);
        break;
      // Ajoutez d'autres cas si nécessaire
      default:
        // Ne fait rien
    }
  }

  // Méthode de déconnexion appelée lors du clic sur le bouton de déconnexion
  deconnexion() {
    this.authService.deconnexion();
  }

}
