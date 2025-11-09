import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { ApplicationFile } from './entities/application-file.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application) private appRepo: Repository<Application>,
    @InjectRepository(ApplicationFile)
    private fileRepo: Repository<ApplicationFile>,
  ) {}

  async create(payload: any, uploadedFiles: Express.Multer.File[]) {
    if (!uploadedFiles || uploadedFiles.length === 0) {
      throw new BadRequestException('At least one PDF file is required');
    }
    if (uploadedFiles.length > 6) {
      throw new BadRequestException('Maximum 6 files allowed');
    }

    const app = this.appRepo.create({
      businessUen: payload.businessUen,
      businessName: payload.businessName,
      name: payload.name,
      position: payload.position,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      termsAccepted:
        payload.termsAccepted === 'true' || payload.termsAccepted === true,
    });

    const savedApp = await this.appRepo.save(app);

    const fileEntities = uploadedFiles.map((f) =>
      this.fileRepo.create({
        application: savedApp,
        originalName: f.originalname,
        contentType: f.mimetype,
        sizeBytes: f.size,
        data: f.buffer,
      }),
    );

    await this.fileRepo.save(fileEntities);

    savedApp.files = fileEntities;
    return savedApp;
  }

  async list() {
    return this.appRepo.find({
      relations: ['files'],
      order: { createdAt: 'DESC' },
    });
  }

  async getFile(applicationId: string, fileId: string) {
    const file = await this.fileRepo.findOne({
      where: { id: fileId },
      relations: ['application'],
    });
    if (!file || file.application.id !== applicationId) {
      throw new NotFoundException('File not found');
    }
    return file;
  }
}
