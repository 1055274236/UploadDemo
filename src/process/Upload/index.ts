/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 21:18:56
 */
import Process from '../process';
import { uploadLog } from '../../sequelize';
import type { Context } from 'koa';
import type { Files, File as FileType } from 'formidable';

export class Upload extends Process {
  constructor() {
    super();
  }

  upload = async (ctx: Context) => {
    const files: Files | undefined = ctx.request.files;
    if (files) {
      const data: any[] = [];
      for (const key in files) {
        const file: FileType = files[key] as FileType;

        data.push(await uploadLog(file, ctx.ip, ctx.host));
      }
      await this.Response.success(ctx, data);
    } else {
      await this.Response.error(ctx);
    }
  };
}
