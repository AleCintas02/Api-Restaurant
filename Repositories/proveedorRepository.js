import mongoose from "mongoose";
import {Proveedor} from "../models/Proveedor.js"

export class ProveedorRepository{
    static async crearProveedor(proveedorData){
        try{
            const newProveedor = new Proveedor(proveedorData)
            await newProveedor.save()
            return newProveedor;
        }catch(err){
            throw new Error("Error al ingresar el proveedor" + err.message)
        }
    }

    static async listarProveedores(){
        try{
            const proveedores = await Proveedor.find()
            
            return proveedores;
        }catch(err){
            throw new Error("Error al listar el proveedores" + err.message)
        }
    }


}
