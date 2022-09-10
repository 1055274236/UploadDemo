/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 21:21:36
 */
import koaBody from 'koa-body';
import fs from 'fs';
import path from 'path';
import type { Middleware } from 'koa';

/**
 * @description: 文件保存文件夹模板
 * @return folderDir 文件夹路径
 * @author: Ming
 */
const uploadDir = () => {
  return `${process.cwd()}/uploads/${new Date().getFullYear()}_${
    new Date().getMonth() + 1
  }_${new Date().getDate()}`;
};

export function koa_body(): Middleware {
  return koaBody({
    // 启用表单解析，可以支持文件上传
    multipart: true,
    formidable: {
      // 文件上传路径
      uploadDir: path.join(process.cwd(), 'uploads'),

      hashAlgorithm: 'md5',

      // 保持文件的扩展名
      keepExtensions: true,

      // 文件上传大小限制，10M
      maxFieldsSize: 10 * 1024 * 1024,

      // 文件上传前的回调
      onFileBegin: (name, file) => {
        let folderDir = uploadDir();
        let _path = path.join(uploadDir(), file.newFilename);
        file.filepath = _path;
        if (!fs.existsSync(folderDir)) {
          fs.mkdirSync(folderDir);
        }
      },
    },
  });
}
