import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
}

export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    // Simulate a request to the server
    return new Observable((observer) => {
      setTimeout(() => {
        if (username === "user" && password === "pass") {
          this.currentUserSubject.next({ username });
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      }, 1000);
    });
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}
