import db from '../database'
import bcrypt from 'bcryptjs'

export const initialSetup = async() =>{
    crearPermisos();
    crearRoles();
    crearRolPermisos();
    crearEmpresa();
    crearTienda();
    crearAdmin();
}

const crearPermisos = async() => {
    try{
        await db.query('SELECT COUNT(*) AS cantidad FROM permiso', async (err, rows, fields) =>{
            if(!err) {
                if(rows[0].cantidad > 0) return;
                const values = [
                    ['CREAR_PRODUCTO'],
                    ['EDITAR_PRODUCTO'],
                    ['CREAR_PRODUCTO'],
                ]
                await db.query("INSERT INTO permiso(nombre_permiso) VALUES ?",[values], (err, rows, fields) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Se crearon 3 permisos: ");
                        console.warn(values);
                    }
                })
            } 
            else{
                console.log(err);
            }
        })
    }
    catch(error){
        console.error(error);
    }
}

const crearRoles = async() => {
    try {
        await db.query('SELECT COUNT(*) AS cantidad FROM rol', async (err, rows, fields) =>{
            if(!err) {
                if(rows[0].cantidad > 0) return;
                const values = [
                    ['ADMIN'],
                    ['ADMIN_EMPRESA'],
                    ['ADMIN_TIENDA'],
                    ['USUARIO_TIENDA'],
                ]
                await db.query("INSERT INTO rol(nombre_rol) VALUES ?",[values], (err, rows, fields) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Se crearon 4 roles: ");
                        console.warn(values);
                    }
                })
            } 
            else{
                console.log(err);
            }
        })
    } catch (error) {
        console.error(error);
    }
}

const crearRolPermisos = async() => {
    try {
        await db.query('SELECT COUNT(*) AS cantidad FROM rol_permiso', async (err, rows, fields) =>{
            if(!err) {
                if(rows[0].cantidad > 0) return;
                const values = [
                    [1,1],
                    [1,2],
                    [1,3],
                ]
                await db.query("INSERT INTO rol_permiso(rol_id, permiso_id) VALUES ?",[values], (err, rows, fields) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Se crearon 3 permisos para el rol Admin: ");
                        console.warn(values);
                    }
                })
            } 
            else{
                console.log(err);
            }
        })
    } catch (error) {
        console.error(error);
    }
}

const crearEmpresa = async() => {
    try {
        await db.query('SELECT COUNT(*) AS cantidad FROM empresa', async (err, rows, fields) =>{
            if(!err) {
                if(rows[0].cantidad > 0) return;
                const values = [
                    ['ReusCode',null,null],
                ]
                await db.query("INSERT INTO empresa(nombre_empresa, url_imagen, ruc) VALUES ?",[values], (err, rows, fields) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Se crearon 1 empresa: ");
                        console.warn(values);
                    }
                })
            } 
            else{
                console.log(err);
            }
        })
    } catch (error) {
        console.error(error);
    }
}

const crearAdmin = async() => {
    try {
        await db.query('SELECT COUNT(*) AS cantidad FROM usuario', async (err, rows, fields) =>{
            if(!err) {
                if(rows[0].cantidad > 0) return;
                const values = [
                    ['reusche488@gmail.com',await encryptPassword('reusche_1'),70868712, 1, 1],
                ]
                await db.query("INSERT INTO usuario(email, password, dni, id_tienda_fk, id_rol_fk) VALUES ?",[values], (err, rows, fields) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Se crearon 1 admin: ");
                        console.warn(values);
                    }
                })
            } 
            else{
                console.log(err);
            }
        })
    } catch (error) {
        console.error(error);
    }
}

const crearTienda = async() => {
    try {
        await db.query('SELECT COUNT(*) AS cantidad FROM tienda', async (err, rows, fields) =>{
            if(!err) {
                if(rows[0].cantidad > 0) return;
                const values = [
                    ['ReusCode','Cloud','Cloud',1]
                ]
                await db.query("INSERT INTO tienda(nombre_tienda, direccion_tienda, departamento_tienda, id_empresa_fk) VALUES ?",[values], (err, rows, fields) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("Se crearon 1 tienda: ");
                        console.warn(values);
                    }
                })
            } 
            else{
                console.log(err);
            }
        })
    } catch (error) {
        console.error(error);
    }
}

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}