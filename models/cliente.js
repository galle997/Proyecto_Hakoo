import sequelizeConexion from '../database/config.js'
import { DataTypes } from 'sequelize'

const Cliente = sequelizeConexion.define('cliente', {
    // Model attributes are defined here
    id_cliente: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false},
    nombre_usuario: { type: DataTypes.STRING },
    correo: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.INTEGER },
    password: { type: DataTypes.STRING, allowNull: false },

});

//Lo que hace sync (sincroniza los campos creados aca con la tabla de la BD)
await Cliente.sync();

export default Cliente