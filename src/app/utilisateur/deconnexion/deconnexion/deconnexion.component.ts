// Import des modules Angular nécessaires pour le composant
import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../services/authentification/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent implements OnInit {

  // Constructeur de la classe, injection des services nécessaires
  constructor(private authService: AuthService, private router: Router) {}

  // Méthode du cycle de vie Angular, appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Appel de la méthode de déconnexion du service AuthService
    this.authService.deconnexion();
  }

}
