import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbconfig.js";

export class Usuario extends Model {}
Usuario.init({
  userid:   { type: DataTypes.STRING, allowNull: false, unique: true },
  nombre:   { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  rol:      { type: DataTypes.STRING, allowNull: false, defaultValue: "usuario" }
}, { sequelize, modelName: "usuario", tableName: "usuario", timestamps: false });

export class Cancion extends Model {}
Cancion.init({
  nombre: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, modelName: "cancion", tableName: "cancion", timestamps: false });

export class Escucha extends Model {}
Escucha.init({
  fechaEscucha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: "escucha", tableName: "escucha", timestamps: false });

// Relaciones (FKs en escucha: usuarioid, cancionid)
Usuario.hasMany(Escucha, { foreignKey: "usuarioid" });
Escucha.belongsTo(Usuario, { foreignKey: "usuarioid" });
Cancion.hasMany(Escucha, { foreignKey: "cancionid" });
Escucha.belongsTo(Cancion, { foreignKey: "cancionid" });

export default { Usuario, Cancion, Escucha };
