/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-09 16:48:17
 */
import type { Context } from 'koa';

class Response {
  constructor() {}

  success(ctx: Context, data?: any) {
    ctx.body = { data, errcode: 200, errmessage: '执行成功' };
  }

  error(ctx: Context, err?: string | Error) {
    ctx.body = { errcode: 200, errmessage: err?.toString() || '执行错误' };
  }
}

class Process {
  protected Response;

  constructor() {
    this.Response = new Response();
  }
}

export default Process;
