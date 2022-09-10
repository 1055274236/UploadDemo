/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-09 15:37:25
 */
import fs from 'fs';
import compose from 'koa-compose';
import { resolve } from 'path';

export default () => {
  let routers: any[] = [];

  const files = fs.readdirSync(resolve(__dirname, './modules'));
  files.forEach((item) => {
    let p = resolve(__dirname, './modules/' + item);
    let router = require(p);
    routers.push(router.routes());
  });

  return compose(routers);
};
