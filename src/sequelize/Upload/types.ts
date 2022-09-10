/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-09 22:52:35
 */
import { DataTypes, ModelAttributes } from 'sequelize';

export const static_file_type: ModelAttributes = {
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
    // unique: true,
  },
  name: DataTypes.STRING(128),
  path: DataTypes.STRING(512),
  filepath: DataTypes.STRING(512),
  size: DataTypes.DOUBLE,
  md5: DataTypes.STRING(128),
  ip: DataTypes.STRING,
};
