import mongoose from "mongoose";
import { ProductoRepository } from "../Repositories/productoRepository.js";

export class ProductoController {
    static async crearProducto(req, res, next) {
        try {
            const productData = req.body;

            // Validación de los datos, en caso de ser necesario
            if (!productData.nombre || !productData.categoria || !productData.cantidad || !productData.unidadDeMedida || !productData.precio) {
                return res.status(400).send("Faltan datos requeridos.");
            }

            // Llamar al repositorio para crear el producto
            const newProduct = await ProductoRepository.crearProducto(productData);
            return res.status(201).json(newProduct);
        } catch (err) {
            // Enviar un mensaje de error detallado
            return res.status(500).json({ message: "Error al crear el producto", error: err.message });
        }
    }

    static async listarProductos(req, res) {
        try {
            const productos = await ProductoRepository.listarProductos()
            return res.status(200).send(productos)
        } catch (err) {
            res.status(500).send("error" + err.message)
        }
    }

    static async vincularProveedor(req, res) {
        const {productoID, proveedorID} = req.body

        try{
            const resultado = await ProductoRepository.vincularProveedor(productoID, proveedorID)
            res.status(200).send(resultado);
        }catch(err){
            res.status(400).json({ error: err.message });
        }
    }

    static async eliminarProducto(req, res) {
        const { productoId } = req.params; 
        
       
        if (!mongoose.Types.ObjectId.isValid(productoId)) {
            return res.status(400).json({ error: "ID de producto no válido" });
        }
        
        try {
           
            const resultado = await ProductoRepository.eliminarProducto(productoId);
            
            
            if (!resultado) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }
            
            res.status(200).json({ mensaje: "Producto eliminado correctamente", resultado });
        } catch (err) {
            
            res.status(400).json({ error: err.message });
        }
    }
    
    
}