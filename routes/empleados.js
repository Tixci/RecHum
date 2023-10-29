const express = require('express');
const empleados = express.Router();
const db = require('../config/database');

empleados.post("/", async (req, res, next) => {
    const {nombre, apellidos, telefono, correo, direccion } = req.body;

    if(nombre && apellidos && telefono && correo && direccion){
        let query = "INSERT INTO empleados(nombre, apellidos, telefono, correo, direccion)";
        query += ` VALUES('${nombre}', '${apellidos}', ${telefono}, '${correo}', '${direccion}')`;
    
        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(201).json({ code: 201, message: "Datos insertado correctamente"});
        }
    
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    console.log(req.body);
    return res.status(500).json({code:500, message: "Campos incomletos"});
});

empleados.delete('/:id([0-9]{1,3})', async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE id=${req.params.id}`;
    const rows = await db.query(query);
    if(rows.affectedRows == 1){
        return res.status(200).json({code: 200, message: "Empleado borrado correctamente"});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
});

empleados.put('/:id([0-9]{1,3})', async (req, res, next) => {
    const { nombre, apellidos, telefono, correo, direccion } = req.body;
    
    if(nombre && apellidos && telefono && correo && direccion){
        let query = `UPDATE empleados SET nombre='${nombre}',apellidos='${apellidos}',`;
        query += `telefono=${telefono},correo='${correo}',direccion='${direccion}' WHERE id=${req.params.id}`;

        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Datos de empleado actualizado correctamente"});
        }
    
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code:500, message: "Campos incomletos"});
});

empleados.patch('/:id([0-9]{1,3})', async (req, res, next) => {
    
    if(req.body.nombre){
        let query = `UPDATE pokemon SET nombre='${req.body.nombre}' WHERE id=${req.params.id}`;

        const rows = await db.query(query);
    
        if(rows.affectedRows == 1){
            return res.status(200).json({ code: 200, message: "Datos de empleado actualizado correctamente"});
        }
        return res.status(500).json({code: 500, message: "Ocurrio un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

empleados.get('/', async (req, res, next) => {
    const emp = await db.query("SELECT * FROM empleados");
    return res.status(200).json({code: 200, message: emp});
});

empleados.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    const emp = await db.query("SELECT * FROM empleados WHERE id = " + id);
    if(id > 0 && id <= 722){
        return res.status(200).json({code: 200, message: emp});
    }
    return res.status(404).json({code: 404, message: "Empleado no encontrado"});
    
});

empleados.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const emp = await db.query("SELECT * FROM empleados WHERE nombre = '" + name + "'");

    return (emp.length > 0) ? 
        res.status(200).json({code: 200, message: emp}) : 
        res.status(404).json({code: 404, message: "Datos de empleado no encontrado"});
});

module.exports = empleados;