import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactLabelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color: string;
}
