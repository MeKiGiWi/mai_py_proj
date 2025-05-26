import axios from 'axios';

export const handleErrorValidator = (
  error: unknown,
  defaultMessage: string = 'Неверные учетные данные',
): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};
