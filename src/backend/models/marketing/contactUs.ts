import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ContactUsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
