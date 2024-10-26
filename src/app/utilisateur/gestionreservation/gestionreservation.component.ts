// Import des modules Angular nécessaires pour le composant
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../../../services/evenement/evenement.service';
import { AuthService } from '../../../services/authentification/auth.service';
import { UserService } from '../../../services/utilisateur/user.service';

// Définition du type PrioriteOrder pour ordonner les priorités
type PrioriteOrder = { faible: number; moyenne: number; élevée: number; [key: string]: number };

@Component({
  selector: 'app-gestionreservation',
  templateUrl: './gestionreservation.component.html',
  styleUrls: ['./gestionreservation.component.css']
})
export class GestionreservationComponent implements OnInit {

  // Constructeur de la classe, injection des services nécessaires
  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  // Déclaration des variables membres
  evenements: any[] = [];
  private readonly prioriteOrder: PrioriteOrder = { faible: 3, moyenne: 2, élevée: 1 };
  critereTri: string = 'nom';
  userId: string = '';

  // Méthode du cycle de vie Angular, appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupérer l'id de l'utilisateur connecté
    this.userService.getUserId().subscribe(userId => {
      this.userId = userId;
    });

    // Récupérer les événements de l'utilisateur connecté
    this.evenementService.getEvenementsParUtilisateur(this.userId)
      .subscribe(
        response => {
          console.log('Événements de l\'utilisateur récupérés avec succès !', response);
          this.evenements.push(...response);
        },
        error => {
          console.error('Erreur lors de la récupération des événements de l\'utilisateur', error);
        }
      );
  }

  // Méthode pour supprimer un événement de la liste
  supprimerEvenement(Newevent: any): void {
    this.evenements = this.evenements.filter(event => event !== Newevent);
    const listeDesIdReservation = this.obtenirListeIdentifiants();

    // Requête pour mettre à jour la liste des réservations de l'utilisateur dans la base de données
    this.evenementService.mettreAJourListeReservationUtilisateur(this.userId, listeDesIdReservation)
      .subscribe(
        response => {
          console.log('Liste de réservations mise à jour avec succès dans la base de données', response);
        },
        error => {
          console.error('Erreur lors de la mise à jour de la liste de réservations dans la base de données', error);
        }
      );
  }

  // Méthode privée pour obtenir la liste des identifiants des événements
  private obtenirListeIdentifiants(): string[] {
    return this.evenements.map(event => event._id);
  }

  // Méthode pour trier les événements en fonction du critère de tri choisi
  triEvenements(): void {
    switch (this.critereTri) {
      case 'nom':
        this.evenements.sort((a, b) => (a.nom > b.nom ? 1 : -1));
        break;
      case 'prix':
        this.evenements.sort((a, b) => a.prixBillets - b.prixBillets);
        break;
      case 'priorite':
        this.evenements.sort((a, b) => this.prioriteOrder[a.priorite] - this.prioriteOrder[b.priorite]);
        break;
      case 'date':
        this.evenements.sort((a, b) => {
          const dateA = this.convertirDate(a.dateEcheance);
          const dateB = this.convertirDate(b.dateEcheance);
          return dateB - dateA;
        });
        break;
      case 'terminer':
        this.evenements.sort((a, b) => (a.termine === b.termine ? 0 : a.termine ? 1 : -1));
        break;
      default:
        break;
    }
  }

  // Méthode privée pour convertir une date au format YYYY-MM-DD 
  private convertirDate(dateString: string): number {
    const [annee, mois, jour] = dateString.split('-').map(Number);
    return new Date(annee, mois - 1, jour).getTime();
  }
}
