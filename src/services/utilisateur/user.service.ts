import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userIdSubject = new BehaviorSubject<string>('');
  private userNameSubject = new BehaviorSubject<string>('');

  setUserId(userId: string): void {
    this.userIdSubject.next(userId);
  }

  getUserId(): Observable<string> {
    return this.userIdSubject.asObservable();
  }

  setUserName(userName: string): void {
    this.userNameSubject.next(userName);
  }

  getUserName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }
}
