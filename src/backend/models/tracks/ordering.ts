import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ChangeTrackOrderingDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  newIndex: number;
}
