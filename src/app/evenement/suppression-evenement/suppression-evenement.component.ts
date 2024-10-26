// Import des modules Angular nécessaires pour le composant
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from '../../../services/evenement/evenement.service';

@Component({
  selector: 'app-suppression-evenement',
  templateUrl: './suppression-evenement.component.html',
  styleUrls: ['./suppression-evenement.component.css']
})
export class SuppressionEvenementComponent implements OnInit {
  evenements: any[] = [];
  selectedEvenement: any;
  evenementId!: string;

  // Constructeur de la classe, injection des services nécessaires
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private evenementService: EvenementService
  ) {}

  // Méthode du cycle de vie Angular, appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupération de l'identifiant de l'événement depuis les paramètres de l'URL
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.evenementId = eventId;
      this.getEvenements(); // Récupérer la liste des événements
      this.getEvenementDetails(); // Récupérer les détails de l'événement sélectionné
    } else {
      console.error('Identifiant non valide');
      // Afficher si l'identifiant est null ou undefined
    }
  }

  // Méthode appelée lors de la sélection d'un événement dans la liste
  onSelectEvent(): void {
    if (this.selectedEvenement) {
      const eventId = this.selectedEvenement._id;
      this.router.navigate(['/suppression', eventId]);
    }
  }

  // Méthode pour obtenir la liste des événements
  getEvenements(): void {
    this.evenementService.getEvenements().subscribe(
      (data) => {
        console.log('Liste des événements :', data);
        this.evenements = data;
      },
      (error: any) => {
        console.error(error);
        // Afficher un message d'erreur à l'utilisateur 
      }
    );
  }

  // Méthode pour obtenir les détails de l'événement
  getEvenementDetails() {
    this.evenementService.getEvenementById(this.evenementId).subscribe(
      (data) => {
        console.log('Détails de l\'événement :', data);
        this.selectedEvenement = data;
      },
      (error: any) => {
        console.error(error);
        // Afficher un message d'erreur à l'utilisateur 
      }
    );
  }

  // Méthode appelée lors de la suppression de l'événement
  onRemove(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement?')) {
      // Utilisez le service pour supprimer l'événement côté serveur
      this.evenementService.supprimerEvenement(this.selectedEvenement._id).subscribe(
        () => {
          console.log('Événement supprimé avec succès :', this.selectedEvenement);
          // Supprimez l'événement de la liste côté client
          const index = this.evenements.findIndex(e => e._id === this.selectedEvenement._id);
          if (index !== -1) {
            this.evenements.splice(index, 1);
            // Réinitialisez l'événement sélectionné après la suppression
            this.selectedEvenement = null;
          }

          // Navigation vers la page d'accueil après une suppression réussie
          this.router.navigate(['/']);

        },
        error => {
          console.error('Erreur lors de la suppression de l\'événement :', error);
          // Affichez un message d'erreur à l'utilisateur 
        }
      );
    }
  }

}
