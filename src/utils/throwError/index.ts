/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-09 22:39:28
 */
import type { Middleware } from 'koa';

export function throwError(): Middleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e: any) {
      ctx.body = {
        errcode: '500',
        errmessage: e.toString(),
      };
    }
  };
}
