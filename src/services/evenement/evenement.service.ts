// evenement.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map, Observable, tap, throwError} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EvenementService {
    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    getEvenements(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/events/`);
    }

    getEvenementById(id: string): Observable<any> {
        const url = `${this.baseUrl}/events/${id}`;
        console.log('Request URL:', url);
        return this.http.get<any>(url);
    }

    getUtilisateurById(id: string): Observable<any> {
        const url = `${this.baseUrl}/users/${id}`;

        return this.http.get<any>(url)
          .pipe(
            catchError(error => {
              console.error('Erreur lors de la récupération de l\'utilisateur :', error);
              throw error;
            })
          );
      }

    getEvenementsParUtilisateur(id: string): Observable<any[]> {
        const url = `${this.baseUrl}/users/${id}/reservation`;

        return this.getUtilisateurById(id).pipe(
          switchMap(utilisateur => {
            // Vérifier si l'utilisateur a des réservations d'événements
            if (utilisateur && utilisateur.reservation && utilisateur.reservation.length > 0) {
              // Créer un tableau d'Observables pour chaque requête d'événement par ID
              const observables: Observable<any>[] = utilisateur.reservation.map((eventId: string) => {
                // Spécifier explicitement que eventId est de type string
                return this.getEvenementById(eventId);
              });

              // Utiliser forkJoin pour attendre que toutes les requêtes soient terminées
              return forkJoin(observables);
            } else {
              // Si l'utilisateur n'a aucune réservation d'événement, retourner un tableau vide
              return of([]);
            }
          }),
          catchError(error => {
            console.error('Erreur lors de la récupération des événements de l\'utilisateur :', error);
            throw error;
          })
        );
    }

    ajouterReservation(userId: string, reservationId: string): Observable<any> {
        const url = `${this.baseUrl}/users/${userId}/reservation`;

        return this.http.post<any>(url, { reservationId })
          .pipe(
            catchError(error => {
              console.error('Erreur lors de l\'ajout de la réservation :', error);
              return throwError(error);
            })
          );
    }

    public mettreAJourListeReservationUtilisateur(userId: string, nouvelleListeReservation: string[]): Observable<any> {
        const url = `${this.baseUrl}/users/${userId}/reservation`;
        return this.http.put(url, { nouvelleListeReservation });
      }

    creerEvenement(formData: FormData): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/events/`, formData);
    }

    getAllImages(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/events/get-all-images`);
    }
    getSingleImage(filename: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/events/get-all-images/${filename}`).pipe(
            tap((response) => console.log('Réponse du serveur:', response))
        );
    }


    modifierEvenement(id: string, evenement: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/events/${id}`, evenement);
    }

    supprimerEvenement(id: string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/events/${id}`);
    }

    marquerEvenementTermine(id: string): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/events/${id}`, { termine: true });
    }

  rechercherEvenements(termeRecherche: string): Observable<any[]> {
    const url = `${this.baseUrl}/events/recherche?terme=${termeRecherche}`;
    return this.http.get<any[]>(url);
  }




}
