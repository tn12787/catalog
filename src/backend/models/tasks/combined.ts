import { IsOptional, IsUrl } from 'class-validator';

import { UpdateBaseReleaseTaskDto } from './update';

import { CreateBaseReleaseTaskDto } from 'backend/models/tasks/create';

export class UpdateReleaseTaskDto extends UpdateBaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  distributor?: string;
}

export class CreateReleaseTaskWithoutTypeDto extends UpdateBaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  distributor?: string;
}

export class CreateReleaseTaskDto extends CreateBaseReleaseTaskDto {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  distributor?: string;
}
