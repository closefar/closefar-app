import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, file, cb) => {
          await fs.mkdir('./images', { recursive: true });
          cb(null, './images');
        },
        filename: (req, file, cb) => {
          cb(null, getFileName(file));
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { fileName: file.filename };
  }
}

const getFileName = (file) => {
  let filename = uuidv4() + '-' + new Date().getTime();
  filename +=
    '.' +
    file.originalname.substring(
      file.originalname.lastIndexOf('.') + 1,
      file.originalname.length,
    );
  return filename;
};
