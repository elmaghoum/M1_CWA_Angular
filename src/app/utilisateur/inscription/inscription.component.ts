// Import des modules Angular nécessaires pour le composant
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/authentification/auth.service'; 
import { Router } from '@angular/router';
import { UserService } from "../../../services/utilisateur/user.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'], 
})
export class InscriptionComponent {

  // Déclaration des variables membres pour stocker les données du formulaire
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  // Constructeur de la classe, injection des services nécessaires
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  // Méthode appelée lors de la soumission du formulaire d'inscription
  inscription(form: NgForm): void {
    // Extraction des valeurs du formulaire
    const { nom, prenom, email, password, confirmPassword } = form.value;

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      console.error('Les mots de passe ne correspondent pas.');
      // Gérer l'erreur en affichant un message d'erreur à l'utilisateur
      return;
    }

    // Appeler le service d'authentification pour l'inscription
    this.authService.inscription(nom, prenom, email, password, 'user')
      .subscribe(
        response => {
          console.log('Inscription réussie !', response);

          // Définir le nom d'utilisateur dans le service UserService
          this.userService.setUserName(nom);

          // Définir le statut de connexion dans AuthService
          this.authService.setLoggedInStatus(true);

          // Stocker le statut dans le stockage local
          localStorage.setItem('isLoggedIn', 'true');
          // Rediriger vers la page d'accueil
          this.router.navigate(['']);
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
          // Gérer l'erreur en affichant un message d'erreur à l'utilisateur
        }
      );
  }
}
