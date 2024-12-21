import bcrypt from "bcrypt";
import User from "../models/User.js";
import { Validation } from "../utils/Validation.js";

export class UserRepository {
    static async createUser(userData) {
        // Validaciones
        await Validation.validateEmail(userData.email);
        await Validation.validateUserName(userData.userName);
        Validation.validatePassword(userData.password);

        //validamos que el username no exista
        const existUserName = await User.findOne({ userName: userData.userName });
        if (existUserName) {
            throw new Error("El nombre de usuario ya existe");
        }

        //validamos que el email no exista
        const existEmail = await User.findOne({ email: userData.email });
        if (existEmail) {
            throw new Error("El email ya está registrado");
        }

        try {
            // Encriptar contraseña
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;

            // Guardar usuario
            const newUser = new User(userData);
            await newUser.save();
            return newUser;

        } catch (err) {
            throw new Error("Error al crear usuario: " + err.message);
        }
    };

    static async login(userData) {
        await Validation.validateEmail(userData.email);
        Validation.validatePassword(userData.password);

        // Buscar el usuario por email
        const user = await User.findOne({ email: userData.email });

        if (!user) {
            throw new Error("El usuario no existe");
        }

        // Comparar la contraseña
        const isValid = await bcrypt.compare(userData.password, user.password);

        if (!isValid) {
            throw new Error("Contraseña incorrecta");
        }

        return {
            userName: user.userName
        };
    }
}
