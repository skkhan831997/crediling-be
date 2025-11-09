import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  IsBoolean,
} from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toUpperCase() : value,
  )
  @Matches(/^\d{8}[A-Z]$/, {
    message: 'Invalid UEN format (8 digits + letter)',
  })
  businessUen: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  businessName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  position: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?:\+65|65)?[689]\d{7}$/, {
    message: 'Invalid Singapore phone number',
  })
  phoneNumber: string;

  @IsBoolean()
  @Type(() => Boolean)
  termsAccepted: boolean;
}
