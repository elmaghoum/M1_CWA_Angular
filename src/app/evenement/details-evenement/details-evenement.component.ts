// Import des modules Angular nécessaires pour le composant
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../../../services/evenement/evenement.service';

@Component({
  selector: 'app-details-evenement',
  templateUrl: './details-evenement.component.html',
  styleUrls: ['./details-evenement.component.css']
})
export class DetailsEvenementComponent implements OnInit {
  evenement: any;

  evenementId!: string;

  // Constructeur de la classe, injection des services nécessaires
  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService
  ) { }

  // Méthode du cycle de vie Angular, appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupération de l'identifiant de l'événement depuis les paramètres de l'URL
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.evenementId = eventId;
      this.getEvenementDetails();
    } else {
      console.error('Identifiant non valide');
      // Afficher si l'identifiant est null ou undefined
    }
  }

  // Méthode pour obtenir les détails de l'événement
  getEvenementDetails() {
    // Appel du service EvenementService pour récupérer les détails de l'événement par son identifiant
    this.evenementService.getEvenementById(this.evenementId).subscribe(
      (data) => {
        console.log('Détails de l\'événement :', data);
        this.evenement = data;
      },
      (error: any) => {
        console.error(error);
        // Affichage d'un message d'erreur
      }
    );
  }

  // Méthode pour marquer l'événement comme terminé
  marquerCommeTermine() {
    // Appel du service EvenementService pour marquer l'événement comme terminé
    this.evenementService.marquerEvenementTermine(this.evenementId).subscribe(
      () => {
        console.log('Événement marqué comme terminé avec succès');
        this.getEvenementDetails(); // Actualiser les détails de l'événement après la modification
      },
      (error: any) => {
        console.error(error);
        // Affichage d'un message d'erreur
      }
    );
  }
}
