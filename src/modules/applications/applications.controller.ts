import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import type { Response } from 'express';
import { memoryStorage } from 'multer';
import { multerConfig } from '../../common/multer-options';

@Controller('api/applications')
export class ApplicationsController {
  constructor(private readonly svc: ApplicationsService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 6, {
      storage: memoryStorage(),
      limits: multerConfig.limits,
      fileFilter: multerConfig.fileFilter as any,
    }),
  )
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateApplicationDto,
  ) {
    return this.svc.create(body, files);
  }

  @Get()
  async list() {
    return this.svc.list();
  }

  @Get(':id/files/:fileId')
  async downloadFile(
    @Param('id') id: string,
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ) {
    const file = await this.svc.getFile(id, fileId);
    res.setHeader('Content-Type', file.contentType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${file.originalName}"`,
    );
    res.send(file.data);
  }
}
