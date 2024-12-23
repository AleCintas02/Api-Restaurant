
import express, { json } from 'express';
import dbconnect from './config.js';
import { UserRepository } from './Repositories/userRepository.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import {register, login, logout} from "./Controllers/AccesoController.js"
import { checkIfAuthenticated } from './middleware/authenticated.js';
import { authenticateToken } from './middleware/authenticateToken .js';
import {ProductoController} from "./Controllers/ProductosController.js"
import { ProveedorController } from './Controllers/ProveedoresController.js';

dotenv.config()

const app = express();
app.use(json())
app.use(cookieParser())

// Conectar a la base de datos antes de iniciar el servidor
dbconnect();
app.post('/register', checkIfAuthenticated, register)
app.post('/login', checkIfAuthenticated, login);
app.post('/logout', logout)

//productos
app.get('/productos', authenticateToken, ProductoController.listarProductos);
app.post('/productos-agregar', authenticateToken, ProductoController.crearProducto);
app.post('/productos/vincular', authenticateToken, ProductoController.vincularProveedor)
app.delete('/productos/:productoID', authenticateToken, ProductoController.eliminarProducto)
app.put('/productos/:productoID', authenticateToken, ProductoController.editarProducto)


//proveedores
app.get('/proveedores', authenticateToken, ProveedorController.listarProveedores);
app.post('/proveedores-agregar', authenticateToken, ProveedorController.crearProveedor);

app.listen(3001, () => {
    console.log("Servidor en el puerto 3001");
});



