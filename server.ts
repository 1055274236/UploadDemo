/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 21:21:47
 */
import koa from 'koa';

import Router from './src/router';
import { throwError, koa_body } from './src/utils';

const port = 50004;
const app = new koa();

app.use(throwError());
app.use(koa_body());

app.use(Router());

app.listen(port, () => {
  console.log('http://localhost:' + port);
});
