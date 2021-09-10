-- RenameIndex
ALTER INDEX "Account.provider_providerAccountId_unique" RENAME TO "Account_provider_providerAccountId_key";

-- RenameIndex
ALTER INDEX "Artwork.calendarEventId_unique" RENAME TO "Artwork_calendarEventId_key";

-- RenameIndex
ALTER INDEX "Artwork.releaseId_unique" RENAME TO "Artwork_releaseId_key";

-- RenameIndex
ALTER INDEX "Artwork.url_unique" RENAME TO "Artwork_url_key";

-- RenameIndex
ALTER INDEX "Distribution.calendarEventId_unique" RENAME TO "Distribution_calendarEventId_key";

-- RenameIndex
ALTER INDEX "Distribution.releaseId_unique" RENAME TO "Distribution_releaseId_key";

-- RenameIndex
ALTER INDEX "Invite.email_unique" RENAME TO "Invite_email_key";

-- RenameIndex
ALTER INDEX "Marketing.calendarEventId_unique" RENAME TO "Marketing_calendarEventId_key";

-- RenameIndex
ALTER INDEX "Marketing.releaseId_unique" RENAME TO "Marketing_releaseId_key";

-- RenameIndex
ALTER INDEX "Mastering.calendarEventId_unique" RENAME TO "Mastering_calendarEventId_key";

-- RenameIndex
ALTER INDEX "Mastering.releaseId_unique" RENAME TO "Mastering_releaseId_key";

-- RenameIndex
ALTER INDEX "Mastering.url_unique" RENAME TO "Mastering_url_key";

-- RenameIndex
ALTER INDEX "MusicVideo.calendarEventId_unique" RENAME TO "MusicVideo_calendarEventId_key";

-- RenameIndex
ALTER INDEX "MusicVideo.releaseId_unique" RENAME TO "MusicVideo_releaseId_key";

-- RenameIndex
ALTER INDEX "MusicVideo.url_unique" RENAME TO "MusicVideo_url_key";

-- RenameIndex
ALTER INDEX "Permission.name_unique" RENAME TO "Permission_name_key";

-- RenameIndex
ALTER INDEX "Release.name_artistId_teamId_unique" RENAME TO "Release_name_artistId_teamId_key";

-- RenameIndex
ALTER INDEX "Role.name_unique" RENAME TO "Role_name_key";

-- RenameIndex
ALTER INDEX "Session.accessToken_unique" RENAME TO "Session_accessToken_key";

-- RenameIndex
ALTER INDEX "Session.sessionToken_unique" RENAME TO "Session_sessionToken_key";

-- RenameIndex
ALTER INDEX "TeamUser.userId_teamId_unique" RENAME TO "TeamUser_userId_teamId_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

-- RenameIndex
ALTER INDEX "VerificationRequest.identifier_token_unique" RENAME TO "VerificationRequest_identifier_token_key";

-- RenameIndex
ALTER INDEX "VerificationRequest.token_unique" RENAME TO "VerificationRequest_token_key";
