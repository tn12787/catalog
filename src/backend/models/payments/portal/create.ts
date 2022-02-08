import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortalSessionDto {
  @IsNotEmpty()
  @IsString()
  teamId: string;
}
