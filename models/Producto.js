import mongoose, { Schema, model } from "mongoose";

const productoSchema = new Schema({
    nombre:{type: String, required: true},
    categoria: {type: String, required: true},
    cantidad: {type: Number, required: true},
    unidadDeMedida: {type: String, required: true},
    precio: {type: Number, required: true},
    proveedor: [{type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: false}]
})

export const Producto = model("Producto", productoSchema);