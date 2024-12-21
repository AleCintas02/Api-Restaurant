import mongoose, { Schema, model } from "mongoose";

const proveedorSchema = Schema({
    nombre:{type: String, required: true},
    direccion: {type: String, required: false},
    telefono: {type: String, required: false},
    email: {type: String, required: true},
    productos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Producto'}]
})

const Proveedor = mongoose.model('Proveedor', proveedorSchema)

module.exports = Proveedor