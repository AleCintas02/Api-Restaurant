import validator from "validator";


export class Validation {
    // Validar email
    static async validateEmail(email) {
        if (!validator.isEmail(email)) {
            throw new Error("El formato del email no es válido");
        }
    }
    
    // Validar nombre de usuario
    static async validateUserName(userName) {
        if (userName.length < 3 || userName.length > 10) {
            throw new Error("El nombre debe tener entre 3 y 10 caracteres");
        }

        
    }

    // Validar contraseña
    static validatePassword(password) {
        if (password.length < 8) {
            throw new Error("La contraseña debe tener como mínimo 8 caracteres");
        }

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
        if (!passwordRegex.test(password)) {
            throw new Error("La contraseña debe contener al menos una letra y un número");
        }
    }
}
