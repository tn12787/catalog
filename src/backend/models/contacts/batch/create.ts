import { IsNotEmpty, ValidateNested } from 'class-validator';

import { CreateContactDto } from 'backend/models/contacts/create';

export class BatchCreateContactDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  data: CreateContactDto[];
}
