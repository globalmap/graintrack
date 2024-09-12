import { useEffect, useState } from "react";
import { container } from "tsyringe";
import { AuthService, User } from "../api/authService";

export const useAuth = () => {
  const authService = container.resolve(AuthService);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe to the observable and update the state
    const subscription = authService.currentUser$.subscribe((user) => {
      setCurrentUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, [authService]);

  return { currentUser, authService };
};
