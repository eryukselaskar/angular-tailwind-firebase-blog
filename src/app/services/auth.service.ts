import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private isLoadedSubject = new BehaviorSubject<boolean>(false);
  isLoaded$ = this.isLoadedSubject.asObservable();

  constructor(private router: Router) {
    onAuthStateChanged(auth, (user) => {
      this.currentUserSubject.next(user);
      this.isLoadedSubject.next(true); // auth durumu yüklendi
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password).then(() => {
      this.router.navigate(['/admin']); // Girişten sonra yönlendir
    });
  }

  logout() {
    return signOut(auth).then(() => {
      this.currentUserSubject.next(null); // logout sonrası kullanıcıyı sıfırla
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
