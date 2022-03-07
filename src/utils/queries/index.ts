import { AxiosError } from 'axios';

export const shouldRetryQuery = <T, D>(failureCount: number, error: AxiosError<T, D>): boolean => {
  if (failureCount >= 3 || Number(error.response?.status) < 500) {
    return false;
  }
  return true;
};
