// Import des modules Angular nécessaires pour le composant
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../../../services/evenement/evenement.service';
import { AuthService } from "../../../services/authentification/auth.service";
import { UserService } from "../../../services/utilisateur/user.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagedepaiment',
  templateUrl: './pagedepaiment.component.html',
  styleUrls: ['./pagedepaiment.component.css']
})
export class PagedepaimentComponent implements OnInit {

  // Déclaration des variables membres
  evenementId!: string;
  userId!: string;
  userName!: string;
  evenement: any;

  // Variables pour le formulaire de paiement
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  amount: number = 0;
  firstName: string = '';
  lastName: string = '';
  titre: string = '';

  // Constructeur de la classe, injection des services nécessaires
  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService,
    private authService: AuthService,
    private userService: UserService,
    private location: Location
  ) { }

  // Méthode appelée à l'initialisation du composant
  ngOnInit(): void {
    // Récupérer l'identifiant de l'événement depuis les paramètres de l'URL
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.evenementId = eventId;
      this.getEvenementDetails(); // Récupérer les détails de l'événement
    } else {
      console.error('Identifiant non valide');
      // Message sur la console indiquant que l'identifiant est null
    }

    // Récupérer l'identifiant de l'utilisateur connecté depuis le service UserService
    this.userService.getUserId().subscribe(userId => {
      this.userId = userId;
    });
  }

  // Méthode pour récupérer les détails de l'événement
  getEvenementDetails() {
    this.evenementService.getEvenementById(this.evenementId).subscribe(
      (data) => {
        console.log('Détails de l\'événement:', data);
        this.evenement = data;
        this.titre = this.evenement.nom;
        this.amount = this.evenement.prixBillets;
      },
      (error: any) => {
        console.error(error);
        // Affichez un message d'erreur à l'utilisateur
      }
    );
  }

  // Méthode appelée lors du traitement du paiement
  processPayment() {
    // Logique de traitement du paiement ici
    console.log('Paiement traité avec succès !');
    console.log('Détails du paiement :', {
      cardNumber: this.cardNumber,
      expiryDate: this.expiryDate,
      cvv: this.cvv,
      amount: this.amount,
      firstName: this.firstName,
      lastName: this.lastName
    });
    this.addReservation(); // Appeler la méthode pour ajouter la réservation
    alert("Paiement traité avec succès !");
    this.location.back(); // Revenir à la page précédente
  }

  // Méthode pour ajouter la réservation à l'utilisateur
  addReservation(): void {
    this.evenementService.ajouterReservation(this.userId, this.evenementId)
      .subscribe(
        response => {
          console.log('Réservation ajoutée avec succès !', response);
        },
        error => {
          console.error('Erreur lors de l\'ajout de la réservation à l\'utilisateur', error);
        }
      );
  }
}
