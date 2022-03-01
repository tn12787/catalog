import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateContactLabelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsString()
  id: string;
}
