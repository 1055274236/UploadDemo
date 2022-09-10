/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 20:46:36
 */
import Process from '../process';
import Path from 'path';
import fs from 'fs';
import { readFile } from './readFile';
import type { Context } from 'koa';

export class Download extends Process {
  constructor() {
    super();
  }

  download = async (ctx: Context) => {
    const { folder, fileName } = ctx.params;

    //获取资源文件的绝对路径
    let filePath = Path.join(process.cwd(), 'uploads', folder, fileName);
    let resHred = readFile(filePath, ctx.headers.range);
    ctx.status = resHred.statusCode;
    ctx.set(resHred.headers);

    let stream = fs.createReadStream(
      filePath,
      resHred.statusCode == 200
        ? {}
        : { start: resHred?.start, end: resHred?.end }
    );
    stream.pipe(ctx.res);
    stream.on('error', () => {
      stream.close();
    });
    ctx.respond = false;

    // //也可使用这种方式。
    // stream.on('data', e => ctx.res.write(e));
    // // 接收完毕
    // stream.on('end', e => ctx.res.end());
  };
}
