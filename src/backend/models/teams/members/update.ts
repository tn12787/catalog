import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeamMemberDto {
  @IsNotEmpty()
  @IsString({ each: true })
  roles: string[];
}
