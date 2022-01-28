import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  role: string;
}
