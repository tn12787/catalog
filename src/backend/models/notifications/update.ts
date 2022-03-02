import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class UpdateNotificationDto {
  @IsNotEmpty()
  @IsBoolean()
  read: boolean;

  @IsNotEmpty()
  @IsString()
  workspaceMemberId: string;
}
