/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 10:44:46
 */
import { defineConnect } from '../sequelize';
import { static_file_type } from './types';
import { deleteFile } from './deleteFile';
import Path from 'path';
import type { File as FileType } from 'formidable';

const fileBaseInfo = defineConnect('file_base_info', static_file_type);

export const uploadLog = async (
  file: FileType,
  ip?: string,
  hosts?: string
) => {
  const path = file.filepath.split(Path.sep).splice(-2).join('/');
  const filepathPrefix = (hosts || 'localhost') + '/static/';

  const value = {
    name: file.originalFilename,
    path: path,
    filepath: filepathPrefix + path,
    size: file.size,
    md5: file.hash,
    ip: ip || '0:0:0:0',
  };
  const result = await fileBaseInfo.findOne({ where: { md5: value.md5 } });

  // 数据库中有便使用旧数据
  if (result) {
    value.path = result.getDataValue('path');
    value.filepath = result.getDataValue('filepath');
    deleteFile(Path.join(process.cwd(), 'uploads', path));
    (file.originalFilename !== result?.getDataValue('name') ||
      result.getDataValue('ip') !== ip) &&
      (await fileBaseInfo.create(value));
  } else {
    await fileBaseInfo.create(value);
  }

  return value;
};
