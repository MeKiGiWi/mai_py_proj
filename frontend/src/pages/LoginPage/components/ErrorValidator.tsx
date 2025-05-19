import axios from 'axios';

type ErrorHandlingConfig = {
  defaultMessage?: string;
};

export const handleErrorValidator = (
  error: unknown, 
  config: ErrorHandlingConfig = {}
): string => {
  const { defaultMessage = 'Неверные учетные данные' } = config;

  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || defaultMessage;
  }
  
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};