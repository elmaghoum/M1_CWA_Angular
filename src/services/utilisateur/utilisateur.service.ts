// utilisateur.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UtilisateurService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,) {}

  inscription(nom: string, prenom: string, email: string, motDePasse: string): Observable<any> {
    const userData = { nom, prenom, email, motDePasse };
    console.log('Données envoyées au serveur :', userData);

    return this.http.post<any>(`${this.baseUrl}/users/inscription`, userData)
       }


       connexion(email: string, motDePasse: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/users/connexion`, { email, motDePasse });
      }
      
 }
