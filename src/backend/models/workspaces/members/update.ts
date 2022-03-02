import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateWorkspaceMemberDto {
  @IsNotEmpty()
  @IsString({ each: true })
  roles: string[];
}
