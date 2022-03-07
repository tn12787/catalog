import { ReleaseTask } from '@prisma/client';
import firebase from 'firebase';

import { initClient } from 'firebaseDetails';
import { ClientRelease } from 'types/common';

export const listUserCalendars = async () => {
  const calendars = await gapi.client.calendar.calendarList.list();
  const profile = await gapi.auth2.getAuthInstance().currentUser.get();
  console.log(profile, calendars.result);
};

export const addEventToGoogleCalendar = async (data: Omit<gapi.client.calendar.Event, 'id'>) => {
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

export const buildReleaseEventDescription = (data: ClientRelease): string => {
  return `
    <h3>Info</h3>
    <ul>
      <li>
        Artist: ${data.artist}
      </li>
      <li>
        Type: ${data.type}
      </li>
    </ul>
  `;
};

export const buildReleaseTaskEventDescription = <T extends ReleaseTask>(data: T): string => {
  return `<h3>Info</h3><ul><li>Status: ${data.status}</li></ul><h3>Notes</h3><p>${data.notes}</p>`;
};

export const createOrUpdateReleaseEvent = async (
  data: ClientRelease,
  refToUpdate: firebase.firestore.DocumentReference,
  existingEventId?: string
) => {
  const calendarData = {
    start: { date: (data.targetDate as Date).toISOString() },
    end: { date: (data.targetDate as Date).toISOString() },
    summary: `${data.name}: Final ClientRelease`,
    description: buildReleaseEventDescription(data),
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

export const createOrUpdateCalendarEventForReleaseTask = async <T extends ReleaseTask>(
  data: T,
  releaseName: string,
  refToUpdate: firebase.firestore.DocumentReference,
  existingEventId?: string
) => {
  const calendarData = {
    start: { date: new Date(data.dueDate as Date).toISOString() },
    end: { date: new Date(data.dueDate as Date).toISOString() },
    summary: `${releaseName}`,
    description: buildReleaseTaskEventDescription(data),
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
