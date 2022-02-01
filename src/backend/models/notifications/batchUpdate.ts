import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class BatchUpdateNotificationDto {
  @IsNotEmpty()
  @IsString({ each: true })
  ids: string[];

  @IsNotEmpty()
  @IsBoolean()
  read: boolean;
}
