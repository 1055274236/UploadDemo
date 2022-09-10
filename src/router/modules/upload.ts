/*
 * @Description:
 * @Autor: Ming
 * @LastEditors: Ming
 * @LastEditTime: 2022-09-10 21:22:20
 */
import { Upload } from '../../process';
import { router } from '../router';

const upload = new Upload();

router.post('/upload', upload.upload);

module.exports = router;
