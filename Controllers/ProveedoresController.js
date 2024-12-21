import { ProveedorRepository } from "../Repositories/proveedorRepository.js";

export class ProveedorController{

    static async crearProveedor(req, res){
        try{
            const dataProveedor = req.body
            const newProveedor = await ProveedorRepository.crearProveedor(dataProveedor)
            return res.status(201).send(newProveedor);
        }catch(err){
           return res.status(500).send("Error " + err) 
        }
    }

    static async listarProveedores(req, res){
        try{
            const proveedores = await ProveedorRepository.listarProveedores()
            return res.status(200).send(proveedores)
        }catch(err){
            return res.status(500).send("Error " + err) 
         }
    }
}