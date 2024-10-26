// auth.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string | null = null;
  private userId: string = '';

  private baseUrl = 'http://localhost:3000';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor(private http: HttpClient, private router: Router) {}


  setUserId(id: string): void {
    this.userId = id;
  }

  getUserId(): Observable<string> {
    return of(this.userId);
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string | null {
    return this.userRole;
  }

  setLoggedInStatus(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  getLoggedInStatus(): boolean {
    return this.isLoggedInSubject.value;
  }

  connexion(id: string, email: string, motDePasse: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/${id}`, { email, motDePasse, role })
      .pipe(
        catchError(error => {
          console.error('Une erreur s\'est produite lors de la connexion:', error);
          throw error;
        })
      );
  }

  inscription(nom: string, prenom: string, email: string, motDePasse: string, role: string): Observable<any> {
    const userData = { nom, prenom, email, motDePasse, role };
    console.log('Données envoyées au serveur :', userData);
    this.setUserId(nom);  // Vous pouvez ajuster cela en fonction de votre logique d'application

    return this.http.post<any>(`${this.baseUrl}/users/`, userData)
      .pipe(
        catchError(error => {
          console.error('Une erreur s\'est produite lors de l\'inscription:', error);
          throw error;
        })
      );
  }

  deconnexion(): void {
    // Log out logic, e.g., clear authentication data
    this.setLoggedInStatus(false);
    localStorage.setItem('isLoggedIn', 'false');

    // Add additional logic if needed, such as clearing user role and ID
    this.setUserRole('');
    this.setUserId('');

    // Redirect to the login page after logging out
    // You can navigate to any desired route after logging out
    this.router.navigate(['']); // Assuming you have injected Router in the constructor
  }
}
