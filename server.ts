/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 21:35:07
 */
import koa from 'koa';
import cors from 'koa2-cors';

import Router from './src/router';
import { throwError, koa_body } from './src/utils';

const port = 50005;
const app = new koa();

app.use(throwError()).use(koa_body()).use(cors());

app.use(Router());

app.listen(port, () => {
  console.log('http://localhost:' + port);
});
