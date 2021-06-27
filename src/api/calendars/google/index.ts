import { initClient } from 'firebase-details';
import { ReleaseTask, ReleaseTaskType } from 'types';
import firebase from 'firebase';

export const listUserCalendars = async () => {
  const calendars = await gapi.client.calendar.calendarList.list();
  const profile = await gapi.auth2.getAuthInstance().currentUser.get();
  console.log(profile, calendars.result);
};

export const addEventToGoogleCalendar = async (
  data: Omit<gapi.client.calendar.Event, 'id'>
) => {
  await initClient();
  return await gapi.client.calendar.events.insert({
    calendarId: 'primary',
    sendUpdates: 'all',
    resource: data,
  });
};

export const updateCalendarEvent = async (data: gapi.client.calendar.Event) => {
  await initClient();
  return await gapi.client.calendar.events.patch({
    calendarId: 'primary',
    eventId: data.id as string,
    sendUpdates: 'all',
    resource: data,
  });
};

export const createOrUpdateCalendarEventForReleaseTask = async <
  T extends ReleaseTask
>(
  data: T,
  releaseName: string,
  taskType: ReleaseTaskType,
  refToUpdate: firebase.firestore.DocumentReference,
  existingEventId?: string
) => {
  const calendarData = {
    start: { date: data.dueDate },
    end: { date: data.dueDate },
    summary: `${releaseName}: ${taskType}`,
  };
  if (existingEventId) {
    await updateCalendarEvent({
      id: existingEventId,
      ...calendarData,
    });
  } else {
    const response = await addEventToGoogleCalendar(calendarData);
    await refToUpdate.update({
      calendarEventId: response.result.id,
    });
  }
};
