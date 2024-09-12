import { useEffect, useState } from "react";
import { container } from "tsyringe";
import { AuthService, User } from "../../../core/api/authService";

export const useAuth = () => {
  const authService = container.resolve(AuthService);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to the observable and update the state
    const subscription = authService.currentUser$.subscribe({
      next: (user) => {
        setCurrentUser(user);
      },
      error: (err) => {
        console.error("AuthService observable error:", err);
      },
    });

    // Clean up the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  return { currentUser, authService };
};
