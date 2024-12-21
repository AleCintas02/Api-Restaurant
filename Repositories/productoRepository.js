import mongoose from "mongoose";
import {Producto} from "../models/Producto.js"

export class ProductoRepository {
    static async crearProducto(productData) {
        try {
            // Crear un nuevo producto con los datos proporcionados
            const newProduct = new Producto(productData);
            // Guardar el nuevo producto en la base de datos
            await newProduct.save();
            return newProduct;
        } catch (err) {
            // Manejo de errores más detallado
            throw new Error("Error al ingresar el producto: " + err.message);
        }
    }

    static async listarProductos(){
        try{
            const productos = await Producto.find()
            return productos
        }catch(err){
            throw new Error("Error al listar los productos" + err.message)
        }
    }
}