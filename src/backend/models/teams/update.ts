import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class UpdateTeamDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl: string;
}
