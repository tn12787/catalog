import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateEmailPreferencesDto {
  @IsOptional()
  @IsBoolean()
  reminders: boolean;
}
