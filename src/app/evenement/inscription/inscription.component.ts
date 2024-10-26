import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilisateurService } from '../../../services/utilisateur/utilisateur.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  @ViewChild('registrationForm') registrationForm!: NgForm;
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private utilisateurService: UtilisateurService, private router: Router) {}
  
  inscription(): void {
    if (this.registrationForm && this.registrationForm.valid) {
      // Vérifier si les mots de passe correspondent
      if (this.password !== this.confirmPassword) {
        console.error('Les mots de passe ne correspondent pas');
        return;
      }

      // Appeler le service pour l'inscription
      this.utilisateurService.inscription(this.nom, this.prenom, this.email, this.password)
        .subscribe(
          response => {
            console.log('Inscription réussie !', response);
            this.router.navigate(['/']);
          },
          error => {
            console.error('Erreur lors de l\'inscription', error);
          }
        );
    } else {
      console.error('Le formulaire n\'est pas valide');
    }
  }
}