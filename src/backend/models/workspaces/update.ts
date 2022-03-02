import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class UpdateWorkspaceDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl: string;
}
