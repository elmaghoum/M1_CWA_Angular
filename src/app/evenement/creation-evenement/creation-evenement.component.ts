// Import des modules Angular nécessaires pour le composant
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvenementService } from '../../../services/evenement/evenement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-evenement',
  templateUrl: './creation-evenement.component.html',
  styleUrls: ['./creation-evenement.component.css']
})
export class CreationEvenementComponent implements OnInit {
  // Déclaration des variables membres
  formulaire: FormGroup;
  nouvelEvenement: any = { nom: '', dateEcheance: '', priorite: '', commentaire: '', image: null };

  images!: any[];

  // Constructeur de la classe, injection des services nécessaires
  constructor(private fb: FormBuilder,
              private evenementService: EvenementService,
              private router: Router) {
    // Initialisation du formulaire avec des validateurs
    this.formulaire = this.fb.group({
      nom: ['', Validators.required],
      dateEcheance: ['', Validators.required],
      priorite: ['', Validators.required],
    });
  }

  // Méthode du cycle de vie Angular, appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupération de toutes les images disponibles
    this.evenementService.getAllImages().subscribe(
      (response) => {
        this.images = response.images;
      },
      (error) => {
        console.error('Erreur lors de la récupération des images :', error);
      }
    );
  }

  // Méthode appelée lors de la création d'un événement
  CreerEvenement() {
    // Création d'un objet FormData pour envoyer les données du formulaire y compris le fichier image
    const formData = new FormData();
    formData.append('image', this.nouvelEvenement.image);
    formData.append('nom', this.nouvelEvenement.nom);
    formData.append('dateEcheance', this.nouvelEvenement.dateEcheance);
    formData.append('priorite', this.nouvelEvenement.priorite);
    formData.append('commentaire', this.nouvelEvenement.commentaire);
    formData.append('genreEvenement', this.nouvelEvenement.genreEvenement);
    formData.append('prixBillets', this.nouvelEvenement.prixBillets);

    // Appel du service EvenementService pour créer un nouvel événement
    this.evenementService.creerEvenement(formData).subscribe(
      () => {
        console.log('Événement créé avec succès');

        // Appel du service EvenementService pour récupérer l'image nouvellement ajoutée
        this.evenementService.getSingleImage(this.nouvelEvenement.image.name).subscribe(
          (imageData) => {
            console.log('Image récupérée avec succès:', imageData);

            // Réinitialisation du formulaire ou redirection vers une autre page si nécessaire
            this.nouvelEvenement = { nom: '', dateEcheance: '', priorite: '', commentaire: '', prixBillets: '', genreEvenement: '', image: imageData };
            this.formulaire.reset(); // Réinitialise le formulaire
            this.router.navigate(['']); // Redirige vers la page d'accueil
          },
          (error) => {
            console.error('Erreur lors de la récupération de l\'image :', error);
          }
        );
      },
      error => console.error(error)
    );
  }

  // Méthode appelée lors de la sélection d'un fichier image
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.nouvelEvenement.image = file;
    }
  }
}
