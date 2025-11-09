import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationFile } from './application-file.entity';

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'business_uen', length: 9 })
  businessUen: string;

  @Column({ name: 'business_name', length: 255 })
  businessName: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  position: string;

  @Column({ length: 255 })
  email: string;

  @Column({ name: 'phone_number', length: 20 })
  phoneNumber: string;

  @Column({ name: 'terms_accepted', type: 'boolean', default: false })
  termsAccepted: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ApplicationFile, (file) => file.application, {
    cascade: true,
  })
  files: ApplicationFile[];
}
