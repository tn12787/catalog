import { IsNotEmpty, IsString } from 'class-validator';

export class BatchDeleteContactDto {
  @IsNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
