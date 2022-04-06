import { useEffect, useState } from 'react'
import { useServicesContext } from '@context/servicesContext'
import { useOrderStateContext } from '@context/orderStateContext'
import { Student } from '@core/models/student.model'
import OrderList from './OrderList'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Order } from '@core/models/order.model'

interface StudentComponentProps {
  student: Student
}

interface OrdersByStatus {
  paid: Order[]
  due: Order[]
  outstanding: Order[]
}

const initialState: OrdersByStatus = {
  paid: [],
  due: [],
  outstanding: []
}

const StudentComponent = ({ student }: StudentComponentProps) => {
  const { StudentService } = useServicesContext()
  const { setOrders } = useOrderStateContext()
  const [ordersByStatus, setOrdersByStaus] = useState<OrdersByStatus>(initialState)
  const { totalToPay } = useOrderStateContext()

  useEffect(() => {
    StudentService.getStudentOrders(student.id).then(orders => {
      setOrders(orders)
      setOrdersByStaus({
        paid: orders.filter(order => order.status === 'PAID'),
        due: orders.filter(order => order.status === 'DUE'),
        outstanding: orders.filter(order => order.status === 'OUTSTANDING')
      })
    })
  }, [])

  return (
    <section>
      <Paper elevation={0}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
          p={2}
          mb={2}
        >
          <Box>
            <Typography variant="body1" display="block">
              {student.firstName} {student.lastName}
            </Typography>
            <Typography variant="body1" display="block">
              Total a pagar
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" display="block">
              {student.cohort}
            </Typography>
            <Typography variant="body1" display="block">
              {totalToPay}
            </Typography>
          </Box>
        </Box>
      </Paper>
      {ordersByStatus && (
        <>
          <OrderList
            title="Cuotas pagadas"
            subtitle="Dale click para expandir"
            orders={ordersByStatus.paid}
          />
          <OrderList
            title="Cuotas pendientes"
            subtitle="Puedes seleccionar varios"
            orders={ordersByStatus.due}
          />
          <OrderList
            title="Cuotas futuras"
            subtitle="Ahorra cancelando antes"
            orders={ordersByStatus.outstanding}
          />
        </>
      )}
    </section>
  )
}

export default StudentComponent
