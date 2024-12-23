import mongoose from "mongoose";
import { Producto } from "../models/Producto.js"
import { Proveedor } from "../models/Proveedor.js";

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

    static async listarProductos() {
        try {
            const productos = await Producto.find().populate('proveedor', 'nombre')
            return productos
        } catch (err) {
            throw new Error("Error al listar los productos" + err.message)
        }
    }

    static async vincularProveedor(productoID, proveedorID) {
        try {
            const producto = await Producto.findById(productoID)
            if (!producto) throw new Error("El producto no existe");

            const proveedor = await Proveedor.findById(proveedorID)
            if (!proveedor) throw new Error("El proveedor no existe");

            if (!producto.proveedor.includes(proveedor._id)) {
                producto.proveedor.push(proveedor._id);
                await producto.save();
            }

            return { mensaje: "Producto vinculado correctamente al proveedor", proveedor, producto };

        } catch (err) {
            throw new Error("Error al vincular el producto al proveedor: " + err.message);
        }
    }

    static async eliminarProducto(productoID) {
        try {
            if(!mongoose.Types.ObjectId.isValid(productoID)){
                throw new Error("ID del producto no valida")
            }

            const resultado = await Producto.deleteOne({_id: productoID})

            if(resultado === 0 ){
                throw new Error("Producto no encontrado")
            }
        } catch (err) {
             throw new Error("error al eliminar producto: " + err.message) 
        }
    }

    static async editarProducto(productoID, productData) {
        try{
            const productoEditar = await Producto.findById(productoID)
            if(!productoEditar){
                throw new Error("Producto no encontrado")
            }
            const resultado = await productoEditar.updateOne(productData)

            return resultado
        }catch(err){
            throw new Error("error: " + err.message)
        }
    }

}