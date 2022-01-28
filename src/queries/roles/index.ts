import axios from 'axios';
import { Role } from '@prisma/client';

export const fetchRoles = async () => {
  const response = await axios.get<Role[]>(`/api/roles`);

  return response.data;
};
