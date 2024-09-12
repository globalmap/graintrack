import { AuthService, User } from "../../../core/api/authService"; // Adjust the import path as needed
import { BehaviorSubject, Observable } from "rxjs";

export class MockAuthService extends AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    if (username === "user" && password === "pass") {
      this.currentUserSubject.next({ username });
      return new Observable((observer) => {
        observer.next(true);
        observer.complete();
      });
    }
    return new Observable((observer) => {
      observer.next(false);
      observer.complete();
    });
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}
