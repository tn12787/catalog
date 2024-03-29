import { PermissionType } from '../src/types/permissions';

export const allPermissions: { name: PermissionType }[] = [
  { name: 'CREATE_RELEASES' },
  { name: 'UPDATE_RELEASES' },
  { name: 'DELETE_RELEASES' },
  { name: 'VIEW_RELEASES' },

  { name: 'CREATE_ARTISTS' },
  { name: 'UPDATE_ARTISTS' },
  { name: 'DELETE_ARTISTS' },
  { name: 'VIEW_ARTISTS' },

  { name: 'CREATE_ROLES' },
  { name: 'UPDATE_ROLES' },
  { name: 'DELETE_ROLES' },
  { name: 'VIEW_ROLES' },

  { name: 'INVITE_USERS' },
  { name: 'DELETE_USERS' },
  { name: 'UPDATE_USERS' },
  { name: 'VIEW_USERS' },

  { name: 'VIEW_TEAM' },
  { name: 'UPDATE_TEAM' },
  { name: 'DELETE_TEAM' },

  { name: 'CREATE_CONTACTS' },
  { name: 'VIEW_CONTACTS' },
  { name: 'UPDATE_CONTACTS' },
  { name: 'DELETE_CONTACTS' },

  { name: 'DELETE_ALL_COMMENTS' },
];
