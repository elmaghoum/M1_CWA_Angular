// Import des modules Angular nécessaires pour le composant
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/authentification/auth.service";

// Décorateur Injectable permettant d'injecter ce service au niveau racine
@Injectable({
  providedIn: 'root',
})
// Classe implémentant l'interface CanActivate pour la gestion de l'accès aux routes
export class AuthGuard implements CanActivate {
  // Constructeur du service, injection du service d'authentification et du routeur
  constructor(private authService: AuthService, private router: Router) {}

  // Méthode canActivate qui retourne un booléen indiquant si la navigation est autorisée
  canActivate(): boolean {
    // Vérification du statut de connexion à l'aide du service d'authentification
    if (this.authService.getLoggedInStatus()) {
      return true; // La navigation est autorisée
    } else {
      this.router.navigate(['']); // Redirection vers la page d'accueil en cas de non connexion
      return false; // La navigation n'est pas autorisée
    }
  }
}
