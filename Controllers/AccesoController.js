import jwt from 'jsonwebtoken';
import { UserRepository } from '../Repositories/userRepository.js';

export const register = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await UserRepository.createUser(userData);
        res.status(201).send(newUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const login = async (req, res) => {
    const userData = req.body;

    try {
        const user = await UserRepository.login(userData);

        // Crear JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res
            .cookie('access_token', token, {
                httpOnly: true, // La cookie solo se puede acceder en el servidor
                secure: process.env.NODE_ENV === 'production', // La cookie solo se puede acceder en HTTPS
                sameSite: 'strict', // La cookie solo se puede acceder desde el mismo dominio
                maxAge: 1000 * 60 * 60, // Expiración de la cookie
            })
            .send({ user, token });
    } catch (err) {
        res.status(401).send(err.message);
    }
};


export const logout = (req, res) => {
    res
    .clearCookie('access_token')
    .send("Sesion cerrada")
}