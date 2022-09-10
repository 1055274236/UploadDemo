/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-09 23:12:39
 */
import { Sequelize, Options, ModelAttributes } from 'sequelize';

const databasesName = 'static_file';
const username = 'static_file';
const password = 'password';

export const sequelize = new Sequelize(databasesName, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  timezone: '+08:00',
  logging: () => {},
  pool: {
    max: 20,
  },
});

/**
 * @description: 返回一个默认的连接
 * @param moduleName: string 模型名称 | 表格名称
 * @param attributes: ModelAttributes 表格变量
 * @param options: Options 该链接定义
 * @return ModelCtor<Model<any, any>>
 * @author: Ming
 */
export function defineConnect(
  moduleName: string,
  attributes: ModelAttributes,
  options?: Options
) {
  return sequelize.define(moduleName, attributes, {
    ...options,
    freezeTableName: true,
  });
}
