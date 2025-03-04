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
        const { productoID, proveedorID } = req.body

        try {
            const resultado = await ProductoRepository.vincularProveedor(productoID, proveedorID)
            res.status(200).send(resultado);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    static async eliminarProducto(req, res) {
        try {
            const productoEliminar = req.params.productoID;
            const resultado = await ProductoRepository.eliminarProducto(productoEliminar);
            return res.status(200).json({ mensaje: "producto eliminado ", resultado })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async editarProducto(req, res) {
        try {
            const productoID = req.params.productoID
            const datosProducto = req.body

            const produnctoActualizado = await ProductoRepository.editarProducto(productoID, datosProducto)

            return res.status(201).json({ mensaje: "Producto editado", producto: produnctoActualizado })

        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async buscarProducto(req, res) {
        try {
            const productoID = req.params.productoID

            const resultado = await ProductoRepository.buscarProducto(productoID)

            return res.status(201).json({ producto: resultado })

        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    static async informeStock(req,res){
        try {
            const stock = req.params.stock

            const informe = await ProductoRepository.informeStock(stock)

            if(informe.length === 0){
                return res.send("No hay productos con stock menor de " + stock)
            }

            return res.status(200).json({productos: informe})

        } catch (error) {
            return res.status(500).json({ error: error.message })   
        }
    }



}