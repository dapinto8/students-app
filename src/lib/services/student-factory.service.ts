import { AxiosClient } from '@frameworks/axios.client';
import { StudentService } from './student.service';

export const studentServiceFactory = () => {
  const client = new AxiosClient(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000');
  return new StudentService(client);
};