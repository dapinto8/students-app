import { studentServiceFactory } from '@services/student-factory.service'
import { StudentService } from '@services/student.service'
import React, { useContext } from 'react'

interface ServicesContextInterface {
  StudentService: StudentService
}

const ServicesContext = React.createContext<ServicesContextInterface | null>(null)

export const ServicesContextProvider = ({ children }) => {
  return (
    <ServicesContext.Provider value={{ StudentService: studentServiceFactory() }}>
      {children}
    </ServicesContext.Provider>
  )
}

export const useServicesContext = () => {
  const context = useContext(ServicesContext)
  if (!context) {
    throw new Error('No ServicesContext.Provider found when calling useServicesContext.')
  }

  return context
}

export default ServicesContext
