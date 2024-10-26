import { Component } from '@angular/core';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  constructor(private utilisateurService: UtilisateurService, private router: Router) {}
  user = {
    email: '',
    password: '',
    remember: false
  };
  connexion(form: NgForm): void {
    const { email, password } = form.value;

    this.utilisateurService.connexion(email, password)
      .subscribe(
        response => {
          console.log('Connexion réussie !', response);
          // Rediriger vers la page d'accueil ou toute autre page nécessaire
          this.router.navigate(['/']);
        },
        error => {
          console.error('Erreur lors de la connexion', error);
          // Gérer l'erreur, par exemple, afficher un message d'erreur à l'utilisateur
        }
      );
  }
}
