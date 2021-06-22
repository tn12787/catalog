// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
import { google } from 'googleapis';
const calendar = google.calendar('v3');

export const addEventToGoogleCalendar = async (
  data: any,
  accessToken: string
) => {
  const authClient = getOauthClient(accessToken);
  return await calendar.events.insert({
    auth: authClient,
    calendarId: 'primary',
    requestBody: data,
  });
};

export const updateCalendarEvent = async (data: any, accessToken: string) => {
  const authClient = getOauthClient(accessToken);

  return await calendar.events.patch({
    auth: authClient,
    calendarId: 'primary',
    eventId: data.id,
    requestBody: data,
  });
};

const getOauthClient = (accessToken: string) => {
  const oauth = new google.auth.OAuth2();
  oauth.setCredentials({ access_token: accessToken });
  return oauth;
};
