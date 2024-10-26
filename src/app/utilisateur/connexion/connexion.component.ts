// Import des modules Angular nécessaires pour le composant
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentification/auth.service';
import { UserService } from "../../../services/utilisateur/user.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  // Constructeur de la classe, injection des services nécessaires
  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService
  ) {}

  // Méthode appelée lors de la soumission du formulaire de connexion
  connexion(form: NgForm): void {
    // Extraction des valeurs du formulaire
    const { name, email, password, role } = form.value; 

    // Appel du service AuthService pour la connexion de l'utilisateur
    this.authService.connexion(name, email, password, role)
      .subscribe(
        response => {
          console.log('Connexion réussie !', response);

          // Définir l'ID de l'utilisateur dans UserService
          this.userService.setUserId(response.utilisateur._id);

          // Définir le nom de l'utilisateur dans UserService
          this.userService.setUserName(response.utilisateur.nom);

          // Définir le statut de connexion dans AuthService
          this.authService.setLoggedInStatus(true);

          // Stocker le statut dans le stockage local
          localStorage.setItem('isLoggedIn', 'true');

          // Redirection vers la page d'accueil ou une autre page après une connexion réussie
          this.router.navigate(['']);

          // Définir le rôle de l'utilisateur après une connexion réussie
          this.authService.setUserRole(response.role);
        },
        error => {
          console.error('Erreur lors de la connexion', error);
          alert("Mot de passe ou email incorrecte ! Veuillez réessayer");
          // Afficher un message d'erreur à l'utilisateur
        }
      );
  }
}
