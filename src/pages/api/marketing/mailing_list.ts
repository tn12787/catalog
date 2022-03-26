import {
  Body,
  createHandler,
  Post,
  UseMiddleware,
  ValidationPipe,
} from '@storyofams/next-api-decorators';

import { addMailingListEntry } from 'backend/apiUtils/email';
import { PrivateApiLimiter } from 'backend/apiUtils/ratelimiting';
import { CreateMailingListEntryDto } from 'backend/models/marketing/mailingList';

@UseMiddleware(PrivateApiLimiter(20))
class MailingListHandler {
  @Post()
  async addMailingListEntry(@Body(ValidationPipe) body: CreateMailingListEntryDto) {
    return await addMailingListEntry(body);
  }
}

export default createHandler(MailingListHandler);
