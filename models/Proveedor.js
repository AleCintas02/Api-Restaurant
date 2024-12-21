import mongoose, { Schema, model } from "mongoose";

const proveedorSchema = Schema({
    nombre:{type: String, required: true},
    direccion: {type: String, required: false},
    telefono: {type: String, required: false},
    email: {type: String, required: true},
})

export const Proveedor = model('Proveedor', proveedorSchema)

