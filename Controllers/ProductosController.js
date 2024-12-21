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
}