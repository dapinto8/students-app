import { AxiosClient } from '@frameworks/axios.client';
import { StudentService } from '@services/student.service';
import React, { useContext } from 'react';

const studentServiceFactory = () => {
  const client = new AxiosClient(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000');
  return new StudentService(client);
};

interface ServicesContextInterface {
  StudentService: StudentService;
}

const ServicesContext = React.createContext<ServicesContextInterface | null>(null);

export const ServicesContextProvider = ({ children }) => {
  return (
    <ServicesContext.Provider value={{ StudentService: studentServiceFactory() }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServicesContext = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('No ServicesContext.Provider found when calling useServicesContext.');
  }

  return context;
};

export default ServicesContext;
