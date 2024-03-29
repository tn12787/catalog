import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateMailingListEntryDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
