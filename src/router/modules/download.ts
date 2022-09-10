/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 20:47:42
 */
import { router } from '../router';
import { Download } from '../../process';

const download = new Download();

// 图片获取
router.get('/static/:folder/:fileName', download.download);

module.exports = router;
