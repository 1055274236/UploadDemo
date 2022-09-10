/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 20:16:08
 */
import mime from 'mime-types';
import fs from 'fs';

export type readFileReturnType = {
  statusCode: number;
  filePath?: string;
  start?: number;
  end?: number;
  size?: number;
  headers: {
    'Content-Range'?: string;
    'content-type'?: string;
    'Content-Length'?: string;
    'Accept-Ranges'?: string;
  };
};

export function readFile(
  filePath: string,
  range?: string,
  chunkSize = 499999 * 2
) {
  // 获取后缀名
  let mimeType = mime.lookup(filePath);

  //建立流对象，读文件
  let startStream = fs.statSync(filePath);
  let fileSize = startStream.size;
  let headers: readFileReturnType = {
    statusCode: 200,
    headers: {
      'Content-Length': fileSize.toString(),
      'content-type': mimeType || 'text',
    },
  };
  if (range) {
    // 大文件分片
    let parts = range.replace(/bytes=/, '').split('-');
    let start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : start + chunkSize;
    end = end > fileSize - 1 ? fileSize - 1 : end;
    chunkSize = end - start + 1;
    headers = {
      statusCode: 206,
      filePath,
      start,
      end,
      size: fileSize,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'content-type': mimeType || 'text',
        'Content-Length': fileSize.toString(),
        'Accept-Ranges': 'bytes',
      },
    };
  }
  return headers;
}
