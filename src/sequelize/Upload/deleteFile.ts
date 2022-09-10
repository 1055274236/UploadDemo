/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 16:17:41
 */
import fs from 'fs';
import Path from 'path';

export function deleteFile(path: string) {
  fs.unlinkSync(path);

  let _path = path.split(Path.sep);
  _path.pop();
  const folderDir = _path.join(Path.sep);

  fs.readdirSync(folderDir).length === 0 && fs.rmdirSync(folderDir);
}
