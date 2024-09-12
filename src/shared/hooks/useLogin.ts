// import AuthService from "@/core/services/AuthService";
// import { useState } from "react";

// export const useLogin = (authService: AuthService) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const login = (username: string, password: string) => {
//     setLoading(true);
//     authService.login(username, password).subscribe({
//       next: () => setLoading(false),
//       error: (err) => {
//         setError(err.message);
//         setLoading(false);
//       },
//     });
//   };

//   return { login, loading, error };
// };
