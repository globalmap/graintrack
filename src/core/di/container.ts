import { container } from "tsyringe";
import { AuthService } from "../api/authService";

// Реєструємо сервіси
container.registerSingleton(AuthService);
