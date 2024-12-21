// config.js
import { connect } from 'mongoose';

const dbconnect = async () => {
    try {
        // Conexión a MongoDB sin las opciones obsoletas
        await connect("mongodb://127.0.0.1/api");
        console.log("Conexión exitosa");
    } catch (err) {
        console.log("Error de conexión", err);
    }
}

export default dbconnect;
