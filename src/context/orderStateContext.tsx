import { Order } from '@core/models/order.model'
import { numberToCurrency } from '@utils/number'
import React, { useContext, useEffect, useState } from 'react'

interface OrderStateContextInterface {
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
  ordersToPay: Order[],
  toggleOrderToPay: (order: Order) => void
  totalToPay: string,
  checkIfCanAddOrderToPay: (order: Order) => boolean
}

const OrderStateContext = React.createContext<OrderStateContextInterface | null>(null)

export const OrderStateContextProvider = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersToPay, setOrdersToPay] = useState<Order[]>([])
  const [totalToPay, setTotalToPay] = useState<string>('')

  const addOrderToPay = (order: Order): void => {
    setOrdersToPay([...ordersToPay, order])
  }

  const removeOrderToPay = (orderId: string): void => {
    const orderIndex = ordersToPay.findIndex(order => order.id === orderId)
    const newOrders = ordersToPay.filter((order, index) => index < orderIndex)
    setOrdersToPay(newOrders)
  }

  const toggleOrderToPay = (order: Order): void => {
    const orderExists = ordersToPay.find(o => o.id === order.id)
    if (!orderExists) {
      addOrderToPay(order)
    } else {
      removeOrderToPay(order.id)
    }
  }

  // Check if the order can be added to the list of orders to pay
  const checkIfCanAddOrderToPay = (order: Order): boolean => {
    const index = orders.findIndex(o => o.id === order.id)
    const previousOrder = orders[index - 1]

    // If there is no previous order, it means that the order is the first one
    // If the previous order is PAID, it means that the order is the first one
    if (!previousOrder || previousOrder.status === 'PAID') {
      return true
    }

    // If the previous order is on the list of orders to pay, it means that the order is the next one
    const orderExists = ordersToPay.find(o => o.id === previousOrder.id)
    if (orderExists) {
      return true
    }

    return false
  }

  useEffect(() => {
    const total = ordersToPay.reduce((acc, order) => acc + order.price + order.interest, 0)
    setTotalToPay(numberToCurrency(total, 'MXN'))
  }, [ordersToPay])

  return (
    <OrderStateContext.Provider
      value={{
        orders,
        setOrders,
        ordersToPay,
        toggleOrderToPay,
        totalToPay,
        checkIfCanAddOrderToPay
      }}
    >
      {children}
    </OrderStateContext.Provider>
  )
}

export const useOrderStateContext = () => {
  const context = useContext(OrderStateContext)
  if (!context) {
    throw new Error('No OrderStateContext.Provider found when calling useOrderStateContext.')
  }

  return context
}

export default OrderStateContext
